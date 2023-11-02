import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "./db"

export const getCurrentSession = async (supabase: SupabaseClient<Database>) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}
