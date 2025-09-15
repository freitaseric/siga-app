"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { AuthenticatedUser, UserClaims } from "@/types/jwt";

export function useAuth() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session?.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        const claims = extractUserClaims(session.access_token);

        if (claims) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            claims,
          });
        } else {
          console.warn(
            "Usuário sem claims válidos - redirecionando para login",
          );
          setUser(null);
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setUser(null);
        router.push("/entrar");
      } else if (event === "SIGNED_IN" && session?.access_token) {
        const claims = extractUserClaims(session.access_token);
        if (claims) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            claims,
          });
        } else {
          console.warn("Login sem claims válidos");
          await supabase.auth.signOut();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/entrar");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return (
      user.claims.permissions.includes("admin") ||
      user.claims.permissions.includes(permission)
    );
  };

  const hasSectorAccess = (sector: string): boolean => {
    if (!user) return false;
    return (
      user.claims.permissions.includes("admin") || user.claims.sector === sector
    );
  };

  return {
    user,
    loading,
    signOut,
    hasPermission,
    hasSectorAccess,
    isAdmin: user?.claims.permissions.includes("admin") || false,
  };
}

function extractUserClaims(accessToken: string): UserClaims | null {
  try {
    const payload = accessToken.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    if (!decoded.sector || !decoded.permissions) {
      console.warn("Claims customizados não encontrados no token:", decoded);
      return null;
    }

    return {
      sector: decoded.sector,
      position: decoded.position || "",
      permissions: Array.isArray(decoded.permissions)
        ? decoded.permissions
        : [],
    };
  } catch (error) {
    console.error("Erro ao decodificar JWT:", error);
    return null;
  }
}
