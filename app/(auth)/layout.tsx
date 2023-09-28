import { AppLogo } from "@/components/ui/common/AppLogo"

type AuthLayoutProps = {
    children: React.ReactNode
  }
  
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute hidden h-full w-full flex-col bg-muted p-4 text-white dark:block dark:border-r lg:relative lg:flex lg:p-10">
          <div
            className="absolute inset-0 bg-ring bg-right-bottom brightness-50 lg:bg-center lg:brightness-100"
            style={{
              backgroundImage:
                  "url(https://images.unsplash.com/photo-1627645835237-0743e52b991f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <AppLogo/>
          </div>
        </div>
        <div className="z-10 w-screen px-4 lg:w-full lg:p-8">
          <div className="mx-auto flex w-full max-w-full flex-col justify-center space-y-6 sm:w-[400px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}