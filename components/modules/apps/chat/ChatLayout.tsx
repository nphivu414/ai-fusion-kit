import { MainLayout } from "@/components/ui/common/MainLayout";

interface ChatLayoutProps {
  children: React.ReactNode;
  leftSidebarElement: React.ReactNode;
}

export const ChatLayout = ({
  children,
  leftSidebarElement,
}: ChatLayoutProps) => {
  return (
    <MainLayout>
      <div className="flex h-screen flex-1 flex-row pt-16">
        <div className="flex flex-1 flex-row">
          <div className="flex flex-1 flex-col overflow-y-hidden">
            <div className="relative flex flex-1 bg-background">
              <div className="flex size-0 flex-col justify-between overflow-x-hidden transition-[width] lg:h-auto lg:max-h-[calc(100vh_-_65px)] lg:w-[300px] lg:border-r">
                {leftSidebarElement}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
