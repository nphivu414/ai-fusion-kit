"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

import { ProfileFormValues } from "./type";

export async function updateProfile({
  fullName,
  username,
  website,
}: ProfileFormValues) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);

  if (!user) {
    throw new Error("You must be logged in to update your profile");
  }

  try {
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      username,
      website,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw error;
    }

    revalidatePath("/profile");
  } catch (error) {
    throw error;
  }
}
