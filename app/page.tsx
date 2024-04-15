import { Metadata } from "next";
import Link from "next/link";
import { Play } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { MainLayout } from "@/components/ui/common/MainLayout";
import { Heading1 } from "@/components/ui/typography";
import { DescriptionHeadingText } from "@/components/modules/home/DescriptionHeadingText";
import { FeatureItems } from "@/components/modules/home/FeatureItems";
import { HeroBannerImage } from "@/components/modules/home/HeroBannerImage";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const runtime = "edge";

export default async function Home() {
  return (
    <MainLayout>
      <div className="pt-16">
        <section className="space-y-6 pb-8 md:pb-12">
          <div className="relative flex h-60 w-full items-center  justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2] md:h-80">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="container flex max-w-5xl flex-col items-center gap-6 text-center">
              <Heading1 className="font-heading bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-3xl font-bold leading-[1.1] tracking-tighter text-transparent dark:from-white dark:to-gray-500 sm:!text-5xl md:!text-7xl">
                {siteConfig.name}
              </Heading1>
              <DescriptionHeadingText />
              <div className="flex items-center space-x-4">
                <Link
                  href="https://www.youtube.com/watch?v=GWalKzuC0Rg"
                  target="_blank"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    })
                  )}
                >
                  <Play className="mr-2" size={16} /> Demo
                </Link>
                <Link href="/apps/chat" className={cn(buttonVariants())}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="px-4">
          <HeroBannerImage />
          <FeatureItems />
        </div>
      </div>
    </MainLayout>
  );
}
