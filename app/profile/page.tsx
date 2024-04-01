import { cookies } from "next/headers";

import { getCurrentProfile } from "@/lib/db/profile";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/modules/profile/Header";
import { ProfileForm } from "@/components/modules/profile/ProfileForm";
import { ProfileFormValues } from "@/components/modules/profile/type";

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const profile = await getCurrentProfile(supabase);
  const user = await getCurrentUser(supabase);

  if (!profile) {
    return null;
  }

  const { avatar_url, full_name, username, website } = profile;
  const profileFormValues: ProfileFormValues = {
    fullName: full_name || undefined,
    username: username || undefined,
    website: website || undefined,
  };

  return (
    <div className="container mx-auto sm:max-w-screen-sm">
      <Header
        avatarUrl={avatar_url}
        email={user?.email}
        fullName={full_name}
        username={username}
        website={website}
      />
      <ProfileForm className="mt-8" formValues={profileFormValues} />
    </div>
  );
}
