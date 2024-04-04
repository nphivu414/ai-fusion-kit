import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { Heading3 } from "@/components/ui/typography";
import { UserAuthForm } from "@/components/modules/auth/UserAuthForm";

export const metadata: Metadata = {
  title: "Sigin",
  description: "Sigin to your account",
};

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getCurrentUser(supabase);

  if (user) {
    redirect(`/apps/chat`);
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Heading3>{siteConfig.name}</Heading3>
        <p className="text-sm text-muted-foreground">
          Empowering Your Imagination with AI Services
        </p>
      </div>
      <UserAuthForm />
    </>
  );
}
