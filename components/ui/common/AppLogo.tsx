import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const AppLogo = () => {
  return (
    <Link href="/">
      <div className='flex items-center'>
        <Image
          className="rounded-full lg:h-10 lg:w-10"
          width={32}
          height={32}
          src="https://avatars.githubusercontent.com/u/69411780?s=200&v=4"
          alt="CV Creator"
        />
        <p className='text ml-3 font-bold'>AI Fusion Kit</p>
      </div>
    </Link>
  )
}