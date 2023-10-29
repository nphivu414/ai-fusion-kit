import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { Loader } from "lucide-react";
import { Heading2 } from "@/components/ui/typography";

export default function Page() {
  return (
    <div className='flex flex-1'>
      <div className='flex w-full flex-col rounded-lg pb-4 lg:bg-background'>
        <div className='mx-auto flex w-full flex-1 flex-col'>
          <div className="flex flex-row items-center justify-between space-y-0 p-4 lg:h-16">
            <Heading2 className='pb-0'>GPT AI Assistant</Heading2>
          </div>
          <Separator/>
          <div className='flex grow basis-0 justify-center pt-4 lg:overflow-y-auto lg:pb-0'>
            <div className="flex w-full flex-col items-center justify-center">
              <Loader className="h-8 w-8 animate-spin"/>
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
  )
}