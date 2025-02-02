import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
export interface TokenSession {
  id: number;
  role: string;
  name: string;
  email: string;
}

export default async function middleware(req: NextRequest) {
  const session = (await cookies()).get("token")?.value;

  if (session) {
    const decoded = jwtDecode(session) as TokenSession;
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/user/home", req.url));
      }
    }
    if (req.nextUrl.pathname.startsWith("/user")) {
      if (decoded.role !== "user") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
