'use client'

import { Github } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/NavigationMenu';
import { buttonVariants } from '../ui/Button';

export const NavigationMainMenu = () => {
  return (
    <NavigationMenu className='pl-4 md:pl-0'>
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <NavigationMenuLink href='https://github.com/nphivu414/ai-fusion-kit' target='_blank' className={buttonVariants({
            variant: 'outline',
            size: 'sm',
          })}>
            <Github size={16} className='mr-0 md:mr-2'/>
            <span className='hidden md:inline-block'>Github</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}