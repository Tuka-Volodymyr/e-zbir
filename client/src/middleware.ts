import {NextResponse, type NextRequest} from "next/server";

export function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname === "/profile") {
    //     const token: string | null = request.headers.get("Authorization");
    //
    //     if (!token) {
    //         return NextResponse.redirect(new URL("/login", request.url));
    //     }
    // }
}