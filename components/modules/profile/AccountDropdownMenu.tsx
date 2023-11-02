"use client"

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { getCurrentProfile } from '@/lib/db/profile';
import { createClient } from '@/lib/supabase/client'
import { Loader, User } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '../auth/LogoutButton';
import { UserAvatar } from '@/components/ui/common/UserAvatar';
import { useProfileStore } from '@/lib/stores/profile';
import { cn } from '@/lib/utils';

type AccountDropdownMenuProps = {
  userEmail?: string
}

export const AccountDropdownMenu = ({ userEmail }: AccountDropdownMenuProps) => {
  const supabase = createClient()
  const [ isLoading, setIsLoading ] = React.useState<boolean>()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const { profile, setProfile } = useProfileStore((state) => state)

  React.useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      const profile = await getCurrentProfile(supabase)
      setIsLoading(false)
      if (!profile) {
        return
      }
      setProfile(profile)
    }
    fetchProfile()
  }, [setProfile, supabase])

  if (!isMounted) {
    return null
  }

  if (isLoading) {
    return <Button variant="ghost" className='h-14'>
      <Loader className='animate-spin' size={24} />
    </Button>
  }

  if (!profile) {
    return <Link href="/signin" className={cn(buttonVariants({
      variant: 'outline',
    }), 'ml-2')}>
      Signin
    </Link>
  }

  const { username, avatar_url } = profile
  const nameLabel = username || userEmail || ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='h-14'>
          <div className='flex items-center'>
            <UserAvatar username={username} avatarUrl={avatar_url} email={userEmail}/>
            <p className='ml-2 hidden md:block'>{nameLabel}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <LogoutButton/>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
