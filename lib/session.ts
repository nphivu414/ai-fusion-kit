import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "./db"

export const getCurrentSession = async (supabase: SupabaseClient<Database>) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}
