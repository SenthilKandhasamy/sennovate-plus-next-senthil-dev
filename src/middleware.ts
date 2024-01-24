import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "./auth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = await getServerSession();
    if (!session?.user.groups?.includes("admin"))
      return NextResponse.redirect(new URL("/", request.url));
  }
}
