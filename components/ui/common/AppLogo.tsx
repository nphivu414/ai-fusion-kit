import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const AppLogo = () => {
  return (
    <Link href="/">
      <div className='flex items-center'>
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src="/logo.png"
          alt={`${siteConfig.name} logo`}
        />
        <p className='text ml-3 font-bold'>{siteConfig.name}</p>
      </div>
    </Link>
  )
}