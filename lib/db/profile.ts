import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { getCurrentSession } from "../session"
import { Database } from "."

export const getCurrentProfile = async (supabase: SupabaseClient<Database>) => {
  const session = await getCurrentSession(supabase)
  const user = session?.user

  if (!user) return null

  const { data, error, status } = await supabase
    .from('profiles')
    .select(`*`)
    .eq('id', user.id)
    .single()


  if (error && status !== 406) {
    return null
  }

  return data
}