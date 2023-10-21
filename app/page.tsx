import { DescriptionHeadingText } from "@/components/modules/home/DescriptionHeadingText";
import { FeatureItems } from "@/components/modules/home/FeatureItems";
import { HeroBannerImage } from "@/components/modules/home/HeroBannerImage";
import { NavigationBar } from "@/components/navigation/NavigationBar";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <NavigationBar/>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl">
           AI Fusion Kit
          </h1>
          <DescriptionHeadingText/>
          <div className="flex items-center space-x-4">
            <Button variant="outline"><Play className="mr-2" size={16}/> Demo</Button>
            <Link href="/apps/chat" className={cn(buttonVariants())}>
              Signup
            </Link>
          </div>
        </div>
      </section>
      <HeroBannerImage/>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Revolutionize the way you build chatbot applications with the power of Next.js, Server Components, and Supabase. This template provides you with a solid foundation to create cutting-edge chatbot apps that are feature-rich and responsive, all while taking advantage of the latest Next.js technology.
          </p>
        </div>
        <FeatureItems/>
      </section>
    </>
  )
}
