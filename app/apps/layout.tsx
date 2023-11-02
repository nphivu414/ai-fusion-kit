import { ChatHistory } from "@/components/modules/apps/chat/ChatHistory"
import { getAppBySlug } from "@/lib/db/apps"
import { getChats } from "@/lib/db/chats"
import { getCurrentSession } from "@/lib/session"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { MainLayout } from '@/components/ui/common/MainLayout'

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const session = await getCurrentSession(supabase)
  const currentApp = await getAppBySlug(supabase, '/apps/chat')
  
  if (!currentApp || !session) {
    return (
      <div className="pt-4">No app found</div>
    )
  }

  const currentProfileId = session.user.id
  
  const chats = await getChats(supabase, {
    appId: currentApp.id,
    profileId: currentProfileId,
  })

  return (
    <MainLayout>
      <div className="flex h-screen flex-1 flex-row pt-16">
        <div className="flex flex-1 flex-row">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="relative flex flex-1 bg-background">
              <div className="flex h-0 w-0 flex-col justify-between overflow-x-hidden transition-[width] lg:h-auto lg:max-h-[calc(100vh_-_65px)] lg:w-[300px] lg:border-r">
                <ChatHistory data={chats} />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
