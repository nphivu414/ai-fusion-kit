import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { App, Database } from "."

export const getApps = async (supabase: SupabaseClient<Database>) => {
  const { data, error, status } = await supabase
    .from('apps')
    .select('*')

  if (error && status !== 406) {
    return null
  }

  return data
}

export const getAppBySlug = async (supabase: SupabaseClient<Database>, slug: App['slug']) => {
  const { data, error, status } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error && status !== 406) {
    return null
  }

  return data
}