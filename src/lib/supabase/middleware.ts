import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createMiddlewareClient = (
  request: NextRequest,
): [SupabaseClient<Database>, NextResponse] => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        Promise.all(
          cookiesToSet.map(({ name, value }) =>
            request.cookies.set(name, value),
          ),
        ).catch(null);

        supabaseResponse = NextResponse.next({
          request,
        });

        Promise.all(
          cookiesToSet.map(({ name, value }) =>
            supabaseResponse.cookies.set(name, value),
          ),
        ).catch(null);
      },
    },
  });

  return [supabase, supabaseResponse];
};
