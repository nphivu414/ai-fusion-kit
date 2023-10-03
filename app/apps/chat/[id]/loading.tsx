import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { ChatInput } from "@/components/ui/chat";
import { Skeleton } from "@/components/ui/Skeleton";
import { Loader, SendHorizonal } from "lucide-react";
import { Heading2 } from "@/components/ui/typography";

export default function Page() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className="flex flex-col items-start justify-between space-y-2 p-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Heading2 className='pb-0'>GPT AI Assistant</Heading2>
        <div className="hidden lg:flex">
          <Skeleton className="mr-2 h-4 w-[50px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>
      <Separator/>
      <div className='flex flex-1'>
        <div className='flex w-full flex-col rounded-lg pb-4 lg:mx-4 lg:bg-background'>
          <div className='mx-auto flex w-full max-w-screen-2xl flex-1 flex-col'>
            <div className='flex grow basis-0 justify-center pt-4 lg:overflow-y-auto lg:pb-0'>
              <div className="flex w-full flex-col items-center justify-center">
                <Loader className="h-8 w-8 animate-spin"/>
              </div>
            </div>
            <div className='fixed bottom-0 left-0 w-full bg-background p-4 lg:relative lg:mt-2 lg:bg-transparent lg:p-0'>
              <ChatInput />
              <div className='absolute bottom-0 right-0 flex w-1/2 justify-end px-2 pb-2'>
                <Button disabled size="sm">
                    Send
                  <SendHorizonal size={14} className='ml-1'/>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-0 w-0 lg:h-auto lg:max-h-[calc(100vh_-_60px)] lg:w-[450px] lg:border-x lg:p-4">
          <Skeleton className="mt-2 h-4 w-[210px]" />
          <div className="mt-4 grid grid-cols-1 gap-2">
            <Skeleton className="h-2 w-[320px]" />
            <Skeleton className="h-2 w-[280px]" />
            <Skeleton className="h-2 w-[300px]" />
            <Skeleton className="h-2 w-[250px]" />
          </div>
          <Separator className='my-4'/>
          <div className="mt-6 grid grid-cols-1 gap-2">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-2 w-[320px]" />
            <Skeleton className="h-2 w-[280px]" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-2 w-[320px]" />
            <Skeleton className="h-2 w-[280px]" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-2 w-[320px]" />
            <Skeleton className="h-2 w-[280px]" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-2">
            <Skeleton className="h-2 w-[100px]" />
            <Skeleton className="h-2 w-[320px]" />
            <Skeleton className="h-2 w-[280px]" />
          </div>
        </div>
      </div>
    </div>
  )
}