'use client'

import { Github } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/NavigationMenu';
import { buttonVariants } from '../ui/Button';
import { CustomIcon } from '../ui/CustomIcon';
import { siteConfig } from '@/config/site';

export const NavigationMainMenu = () => {
  return (
    <NavigationMenu className='hidden pl-4 md:pl-0 lg:block'>
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <NavigationMenuLink href={siteConfig.links.github} target='_blank' className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
          })}>
            <Github size={16}/>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <NavigationMenuLink href={siteConfig.links.x} target='_blank' className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
          })}>
            <CustomIcon.x  width={12} height={12}/>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}