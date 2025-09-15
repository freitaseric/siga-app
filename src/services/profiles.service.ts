import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

class ProfilesService {
  constructor(private supabase: SupabaseClient<Database>) {}

  public async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from("profiles")
      .select()
      .eq("uid", userId)
      .single();

    if (error) {
      throw new Error(`Error fetching profile: ${error.message}`);
    }

    return data;
  }
}

export default new ProfilesService(createClient());
