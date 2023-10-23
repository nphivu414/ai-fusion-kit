import { MainLayout } from "@/components/ui/common/MainLayout"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col pt-16">
        {children}
      </div>
    </MainLayout>
  )
}
