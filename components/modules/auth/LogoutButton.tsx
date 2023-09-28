'use client';

import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';
import React from 'react';

export default function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="post">
      <Button size="sm" variant="ghost" className="w-full justify-start">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </form>
  )
}