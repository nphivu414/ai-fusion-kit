import { AppSideBar } from "@/components/modules/apps/app-side-bar"
import { ChatHistory } from "@/components/modules/apps/chat/ChatHistory"
import { ChatHistoryDrawer } from "@/components/modules/apps/chat/ChatHistoryDrawer"
import { MainLayout } from "@/components/ui/common/MainLayout"
import { getAppBySlug } from "@/lib/db/apps"
import { getChats } from "@/lib/db/chats"
import { getCurrentSession } from "@/lib/session"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const supabase = createServerComponentClient({ cookies })
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
      <AppSideBar/>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="relative flex flex-1 bg-background">
          <div className="flex h-0 w-0 flex-col justify-between overflow-x-hidden transition-[width] lg:h-auto lg:max-h-[calc(100vh_-_65px)] lg:w-[300px] lg:border-r lg:px-4">
            <ChatHistory data={chats} />
          </div>
          <ChatHistoryDrawer data={chats}/>
          {children}
        </div>
      </div>
    </MainLayout>
  )
}
