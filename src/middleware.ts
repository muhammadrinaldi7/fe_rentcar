import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export interface TokenSession {
  id: number;
  role: string;
  name: string;
  email: string;
}

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("token")?.value;

  // Jika tidak ada token, biarkan pengguna tetap di halaman yang diminta
  if (!session) {
    return NextResponse.next();
  }

  let decoded: TokenSession | null = null;

  try {
    // Decode token untuk mendapatkan data role
    decoded = jwtDecode(session) as TokenSession;
  } catch (error) {
    console.error("Token decoding failed:", error);
    // Jika token tidak valid, hapus cookie dan arahkan ke halaman login
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  // Redirect berdasarkan role
  if (decoded) {
    if (
      decoded.role === "admin" &&
      req.nextUrl.pathname !== "/admin/dashboard"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (decoded.role === "user" && req.nextUrl.pathname !== "/user/home") {
      return NextResponse.redirect(new URL("/user/home", req.url));
    }
  }

  // Jika token valid dan tidak ada kebutuhan untuk redirect, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Konfigurasi path yang akan dicek middleware
export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/", "/auth/login"],
};
