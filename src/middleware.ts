import type { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "./lib/supabase/middleware";
import type { AuthenticatedUser, UserClaims } from "./types/jwt";

const ROUTE_PERMISSIONS = {
  public: ["/entrar", "/sem-acesso", "/"],

  authenticated: ["/dashboard"],

  sectors: {
    gestao: ["/admin", "/relatorios/completos", "/usuarios"],
    credito: ["/credito", "/pedidos", "/relatorios/credito"],
    administrativo: ["/servicos", "/atendimentos", "/relatorios/servicos"],
  },

  permissions: {
    admin: ["/admin", "/usuarios", "/configuracoes"],
    criar_servico: ["/servicos/novo"],
    editar_servico: ["/servicos/editar"],
    ver_relatorios: ["/relatorios"],
  },
} as const;

export async function middleware(request: NextRequest) {
  const [supabase, supabaseResponse] = createMiddlewareClient(request);
  const pathname = request.nextUrl.pathname;

  try {
    if (isPublicRoute(pathname)) {
      return supabaseResponse;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return redirectToLogin(request);
    }

    const claims = extractUserClaims(user);

    if (!claims) {
      console.error("Claims não encontradas para usuário:", user.id);
      return redirectToLogin(request);
    }

    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      email: `${user.email}`,
      claims,
    };

    const hasAccess = await checkRouteAccess(pathname, authenticatedUser);

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/sem-acesso", request.url));
    }

    supabaseResponse.headers.set("x-user-id", authenticatedUser.id);
    supabaseResponse.headers.set(
      "x-user-sector",
      authenticatedUser.claims.sector,
    );
    supabaseResponse.headers.set(
      "x-user-permissions",
      JSON.stringify(authenticatedUser.claims.permissions),
    );

    return supabaseResponse;
  } catch (error) {
    console.error("Erro no middleware:", error);
    return redirectToLogin(request);
  }
}

function isPublicRoute(pathname: string): boolean {
  return ROUTE_PERMISSIONS.public.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function extractUserClaims(user: User | null): UserClaims | null {
  try {
    const claims = user?.app_metadata || user?.user_metadata;

    if (!claims?.sector || !claims?.permissions) {
      return null;
    }

    return {
      sector: claims.sector,
      position: claims.position ?? "",
      permissions: Array.isArray(claims.permissions) ? claims.permissions : [],
    };
  } catch (error) {
    console.error("Erro ao extrair claims:", error);
    return null;
  }
}

async function checkRouteAccess(
  pathname: string,
  user: AuthenticatedUser,
): Promise<boolean> {
  const { sector, permissions } = user.claims;

  if (permissions.includes("admin")) {
    return true;
  }

  if (
    ROUTE_PERMISSIONS.authenticated.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    )
  ) {
    return true;
  }

  const sectorRoutes = ROUTE_PERMISSIONS.sectors[sector] || [];
  if (
    sectorRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    )
  ) {
    return true;
  }

  for (const permission of permissions) {
    const permissionRoutes =
      ROUTE_PERMISSIONS.permissions[
        permission as keyof typeof ROUTE_PERMISSIONS.permissions
      ] || [];
    if (
      permissionRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
      )
    ) {
      return true;
    }
  }

  return false;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/entrar", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
