import { UserAvatar } from '@/components/ui/common/UserAvatar';
import { Subtle } from '@/components/ui/typography';
import { Profile } from '@/lib/db';
import { User } from '@supabase/supabase-js';
import React from 'react';

type HeaderProps = {
  email: User['email'],
  fullName: Profile['full_name'],
  username: Profile['username'],
  avatarUrl: Profile['avatar_url'],
  website: Profile['website'],
}

export const Header = ({ username, avatarUrl, email, fullName }: HeaderProps) => {
  return (
    <div className='px-4 pt-4'>
      <UserAvatar username={username} avatarUrl={avatarUrl} email={email} className='h-24 w-24 border-2'/>
      <div className='mt-6'>
        <div className='flex items-end'>
          {fullName ? <p className='text-2xl'>{fullName}</p> : null}
          {username ? <p className='ml-1 text-muted-foreground'>(@{username})</p> : null}
        </div>
        {email ? <Subtle className='mt-2'>{email}</Subtle> : null}
      </div>
    </div>
  );
}