import { DescriptionHeadingText } from "@/components/modules/home/DescriptionHeadingText";
import { FeatureItems } from "@/components/modules/home/FeatureItems";
import { HeroBannerImage } from "@/components/modules/home/HeroBannerImage";
import { NavigationBar } from "@/components/navigation/NavigationBar";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <NavigationBar/>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
           AI Fusion Kit
          </h1>
          <DescriptionHeadingText/>
          <div className="space-x-4">
            <Link href="/resume" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
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
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern web app, with features
            like auth, route handlers, server actions, and static pages would work in
            Next.js 13 app router.
          </p>
        </div>
        <FeatureItems/>
      </section>
    </>
  )
}
