'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { ProfileFormValues } from "./type"
import { cookies } from "next/headers"
import { Database } from "@/lib/db"
import { getCurrentSession } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function updateProfile({
  fullName,
  username,
  website
}: ProfileFormValues) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const session = await getCurrentSession(supabase)

  if (!session) {
    throw new Error("You must be logged in to update your profile")
  }

  const { user } = session

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      username,
      website,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      throw error
    }
    
    revalidatePath('/profile')
  } catch (error) {
    throw error
  }
}
