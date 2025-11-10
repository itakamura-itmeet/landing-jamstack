// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublic = createRouteMatcher([
  '/', '/sign-in(.*)', '/sign-up(.*)', '/api/public(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublic(req)) return;

  const { userId } = await auth();
  if (!userId) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
