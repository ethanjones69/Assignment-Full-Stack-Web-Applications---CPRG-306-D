import { NextResponse } from "next/server";
import { validateUser } from "@/app/libs/auth";

export const config = {
  matcher: "/api/movies/:path*",
};

export async function middleware(request) {
  if (request.method === "GET") return NextResponse.next();
  const user = validateUser(request.headers.get("Authorization"));

  if (!user || user.role !== "ADMIN") {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  const headers = new Headers(request.headers);
  headers.set("user-role", user.role);
  return NextResponse.next({ request: { headers } });
}
