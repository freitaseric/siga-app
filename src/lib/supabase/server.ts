import { createServerClient as BASE_createServerClient } from "@supabase/ssr";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createServerClient = (
  cookieStore: ReadonlyRequestCookies | RequestCookies,
) => {
  return BASE_createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        Promise.all(
          cookiesToSet.map(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          ),
        ).catch(null);
      },
    },
  });
};
