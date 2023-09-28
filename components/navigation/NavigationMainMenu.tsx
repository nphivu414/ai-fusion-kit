'use client'

import { NavigationListItem, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/NavigationMenu';
import { NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

export const NavigationMainMenu = () => {
  return (
    <NavigationMenu className='hidden lg:block'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
          Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                Beautifully designed components built with Radix UI and
                Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <NavigationListItem href="/docs" title="Introduction">
          Re-usable components built using Radix UI and Tailwind CSS.
              </NavigationListItem>
              <NavigationListItem href="/docs/installation" title="Installation">
          How to install dependencies and structure your app.
              </NavigationListItem>
              <NavigationListItem href="/docs/primitives/typography" title="Typography">
          Styles for headings, paragraphs, lists...etc
              </NavigationListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/apps" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Apps
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Docs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Changelog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}