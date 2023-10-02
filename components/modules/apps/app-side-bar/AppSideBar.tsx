import React from 'react'
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { getApps } from '@/lib/db/apps';
import { AppSideBarList } from './AppSideBarList';

export const AppSideBar = async () => {
  const supabase = await createServerComponentClient({ cookies })
  const apps = await getApps(supabase)
  return (
    <aside className="sticky top-16 flex w-0 flex-col overflow-x-hidden bg-muted transition-[width] lg:w-[73px] lg:border-r lg:hover:w-80" aria-label="Sidenav">
      <AppSideBarList apps={apps} />
    </aside>
  )
}