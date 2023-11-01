import React from 'react';
import { AppLogo } from '../ui/common/AppLogo';
import { Separator } from '../ui/Separator';
import Link from 'next/link';
import { ThemeToggle } from '../theme';
import { siteConfig } from '@/config/site';
import { CustomIcon } from '../ui/CustomIcon';

export const Sidebar = () => {
  return (
    <div className='h-screen w-80 border-r bg-background'>
      <div className="flex items-center justify-between px-4 pt-2">
        <AppLogo />
        <ThemeToggle />
      </div>
      <Separator className='my-2'/>
      <ul className="menu py-0 pl-12">
        <li>
          <Link href="#" className="group flex items-center rounded-lg p-2 text-lg">
            Explore
          </Link>
        </li>
        <li>
          <a href={siteConfig.links.github} className="group flex items-center rounded-lg p-2 text-lg">
            Github
          </a>
        </li>
        <li>
          <a href={siteConfig.links.x} className="group flex items-center rounded-lg p-2 text-lg">
            Follow on
            <CustomIcon.x width={16} height={16}/>
          </a>
        </li>
      </ul>
    </div>
  )
}
