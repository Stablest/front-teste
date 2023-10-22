import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { URL } from "./utils/enums/URL";
import { RedirectType, redirect, useRouter } from "next/navigation";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!request.cookies.has("jwt_token")) {
      return NextResponse.redirect("http://localhost:3000/");
    }
    const newHeader = new Headers();
    newHeader.set(
      "Authorization",
      `Bearer ${request.cookies.get("jwt_token")?.value}`
    );
    const res = await fetch(`${URL.BASE}/user/auth`, {
      headers: newHeader,
    });
    const data = await res.json();
    if (!data.success) return NextResponse.redirect("http://localhost:3000/");
    return;
  }
}
