import { NavigationBar } from "@/components/navigation/NavigationBar"
import { Sidebar } from "@/components/navigation/SideBar"

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="relative flex min-h-screen flex-col">
          <NavigationBar/>
          {children}
        </div>
      </div> 
      <div className="drawer-side z-50 overflow-y-hidden">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Sidebar/>
      </div>
    </div>
  )
}
