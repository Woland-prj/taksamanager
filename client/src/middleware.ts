import { NextRequest, NextResponse } from "next/server";
import { refreshJWT } from "./functions/jwt";

export default async function middleware(request: NextRequest) {
    // refreshJWT()
    // if (request.nextUrl.pathname.startsWith('/auth')) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url))
    // }

    // if (request.nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    //     return NextResponse.redirect(new URL('/auth/login', request.url))
    // }
    
}
