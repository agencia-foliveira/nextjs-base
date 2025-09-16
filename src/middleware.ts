import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Definir rotas protegidas
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/profile(.*)', '/admin(.*)']);

// Definir rotas públicas (opcional)
// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/sign-in(.*)',
//   '/sign-up(.*)',
//   '/about',
// ]);

export default clerkMiddleware(async (auth, req) => {
  // Proteger rotas definidas
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Pular arquivos Next.js internos e arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas da API
    '/(api|trpc)(.*)',
  ],
};
