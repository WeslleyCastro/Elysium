import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;
  
  const signInUrl = new URL("/signin", req.url) 

  if (!token) {
    if(req.nextUrl.pathname === "/signin"){
      return NextResponse.next();
    }
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/profile", "/share"]
}