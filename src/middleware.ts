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

  // Jika tidak ada token, redirect ke login
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  let decoded: TokenSession | null = null;
  try {
    // Coba mendecode token untuk mendapatkan data pengguna
    decoded = jwtDecode(session) as TokenSession;
  } catch (error) {
    // Jika decoding token gagal, redirect ke login
    console.error("Token decoding failed:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Cek role dan redirect berdasarkan path
  if (decoded) {
    // Jika user mencoba mengakses halaman admin tetapi bukan admin, redirect ke halaman user
    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/user/home", req.url));
    }

    // Jika user mencoba mengakses halaman user tetapi bukan user, redirect ke halaman admin
    if (req.nextUrl.pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  // Jika token valid dan sesuai role, lanjutkan ke rute yang diminta
  return NextResponse.next();
}

// Menentukan matcher untuk path yang perlu dicek
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
