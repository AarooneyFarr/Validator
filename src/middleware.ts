import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/types/supabase-generated.types'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req, res })


    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    const hostname = req.headers
        .get("host")!
        .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    // console.log("Hostname")
    // console.log(hostname)

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = url.pathname;

    // rewrites for app pages
    if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session && path !== "/login") {
            return NextResponse.redirect(new URL("/login", req.url));
        } else if (session && path == "/login") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.rewrite(
            new URL(`/app${path === "/" ? "" : path}`, req.url),
        );
    }


    // special case for `vercel.pub` domain
    if (hostname === "vercel.pub") {
        return NextResponse.redirect(
            "https://vercel.com/blog/platforms-starter-kit",
        );
    }

    // rewrite root application to `/home` folder
    if (
        hostname === "localhost:3000" ||
        hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
        return NextResponse.rewrite(new URL(`/home${path}`, req.url));
    }

    // rewrite everything else to `/[domain]/[path] dynamic route
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));

    return res
}

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};