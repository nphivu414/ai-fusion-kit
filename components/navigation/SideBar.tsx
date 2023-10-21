import React from 'react';
import { AppLogo } from '../ui/common/AppLogo';
import { Separator } from '../ui/Separator';
import Link from 'next/link';
import { ThemeToggle } from '../theme';

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
          <Link href="#" className="group flex items-center rounded-lg p-2 text-lg">
          Apps
          </Link>
          <ul className="menu m-0 p-0">
            <li>
              <Link href="">
                Chat GPT
              </Link>
            </li>
            <li>
              <Link href="">
                AnimateDiff
              </Link>
            </li>
            <li>
              <Link href="">
                Stable Diffusion
              </Link>
            </li>
            <li>
              <Link href="">
                React Flow GPT
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="#" className="group flex items-center rounded-lg p-2 text-lg">
          Docs
          </Link>
        </li>
        <li>
          <Link href="#" className="group flex items-center rounded-lg p-2 text-lg">
          Changelog
          </Link>
        </li>
      </ul>
    </div>
  )
}
