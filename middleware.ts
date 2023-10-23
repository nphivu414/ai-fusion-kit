import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && req.nextUrl.pathname.indexOf('/apps') !== -1) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  if (req.nextUrl.pathname === '/apps/chat') {
    return NextResponse.redirect(new URL('/apps/chat/new', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/apps/:path*', '/profile'],
}