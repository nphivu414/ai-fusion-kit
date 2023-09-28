import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { getCurrentProfile } from '@/lib/db/profile';
import { getCurrentSession } from '@/lib/session';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../auth/LogoutButton';
import { UserAvatar } from '@/components/ui/common/UserAvatar';

export const AccountDropdownMenu = async () => {
  const supabase = await createServerComponentClient({ cookies })
  const currentProfile = await getCurrentProfile(supabase)
  const currentSession = await getCurrentSession(supabase)

  if (!currentProfile || !currentSession) {
    return null
  }

  const { username, avatar_url } = currentProfile
  const nameLabel = username || currentSession.user.email || ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='h-14'>
          <div className='flex items-center'>
            <UserAvatar username={username} avatarUrl={avatar_url} email={currentSession.user.email}/>
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
