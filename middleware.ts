import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/middleware'

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && req.nextUrl.pathname.indexOf('/apps') !== -1) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return response
}

export const config = {
  matcher: ['/', '/apps/:path*', '/profile'],
}