import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server' // Import the async client

export async function middleware(request: NextRequest) {
  // We are not using the response object directly, so we can remove it for now.
  // The new createClient handles cookies server-side.
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If the user is not logged in and tries to access the account page, redirect them
  if (!user && request.nextUrl.pathname.startsWith('/account')) {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  // Protect the /dash route
  if (request.nextUrl.pathname.startsWith('/dash')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/sign-in'
      return NextResponse.redirect(url)
    }

    // Check if the user is the Payload admin
    const { data: adminUser, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', user.email)
      .single()

    if (error || !adminUser) {
      // Not an admin, redirect to home page
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }
  
  // Only allow test routes in development
  if (request.nextUrl.pathname.startsWith('/api/test-') && process.env.NODE_ENV === 'production') {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};