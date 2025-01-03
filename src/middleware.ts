import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/settings(.*)", "/"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();

  // Pokud je požadovaná cesta veřejná, neprováděj žádné přesměrování
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Pokud je požadovaná cesta chráněná a uživatel není přihlášen
  if (isProtectedRoute(req) && !authObject.userId) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL není definována v prostředí.");
    }
    const signInUrl = new URL("/sign-in", baseUrl);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl.toString(), 302);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
