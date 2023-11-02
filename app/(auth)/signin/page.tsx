import { Metadata } from "next"
import { redirect } from "next/navigation"
import { UserAuthForm } from "@/components/modules/auth/UserAuthForm"
import { getCurrentSession } from "@/lib/session"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Heading3 } from "@/components/ui/typography"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Sigin",
  description: "Sigin to your account",
}

export const runtime = "edge"
export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const session = await getCurrentSession(supabase)

  if (session) {
    redirect(`/apps/chat`)
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
  )
}