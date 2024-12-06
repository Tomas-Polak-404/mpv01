import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/settings(.*)"]);

export default clerkMiddleware(async (auth, req, res) => {
    const authObject = await auth();

    // Ověříme, jestli je požadovaná cesta chráněná a uživatel není přihlášen
    if (isProtectedRoute(req) && !authObject.userId) {
        return authObject.redirectToSignIn({ returnBackUrl: req.url });
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
