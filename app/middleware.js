import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/welcome", req.url)); // ส่งไปหน้าห้ามเข้า
    }

    return NextResponse.next();
}

// ใช้ middleware นี้เฉพาะเส้นทาง `/admin`
export const config = {
    matcher: "/admin/:path*",
};
