// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // rutas públicas
  publicRoutes: ['/'],
});

export const config = {
  matcher: [
    // pasa por middleware todo menos estáticos
    '/((?!_next|static|.*\\..*|favicon.ico).*)',
  ],
};
