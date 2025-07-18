import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {  routeAccess } from './lib/routes';
import { NextResponse } from 'next/server';

const matchers = Object.keys(routeAccess).map(
  (route) => ({
    matcher: createRouteMatcher([route]),
    allowedRoles: routeAccess[route],
  })
);

// const checkRoleandRedirect = (
//   req: NextRequest, 
//   role: string | undefined,
//   allowedRole: keyof typeof routeMatchers
// ): NextResponse | undefined => {

//   if(routeMatchers[allowedRole](req) && role !== allowedRole) {
//     const url = new URL(`/`, req.url);
//     console.log("Unauthorized access, redirecting to,",url)
//     return NextResponse.redirect(url);
// }
// }
export default clerkMiddleware( async (auth, req)=>{
  const {userId, sessionClaims} = await auth();
  const url = new URL(req.url);
  const role = userId && sessionClaims?.metadata?.role ? sessionClaims.metadata.role
  :userId ? "patient" : "sign-in";
  
const matchchingRoute = matchers.find(({matcher}) => matcher(req));

if (matchchingRoute && !matchchingRoute.allowedRoles.includes(role)) {

  return NextResponse.redirect(new URL(`/${role}`, url.origin));
}
  return NextResponse.next();

  // const response = checkRoleandRedirect(req, role, 'admin') ||
  // checkRoleandRedirect(req, role, 'doctor');

  // if (response)
  //   return response;

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};