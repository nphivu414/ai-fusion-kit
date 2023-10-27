import './highlight.css';
import { MainLayout } from '@/components/ui/common/MainLayout'

export const dynamic = 'force-dynamic'

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col pt-16 ">
        <div className='container p-4'>
          {children}
        </div>
      </div>
    </MainLayout>
  )
}
