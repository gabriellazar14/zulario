import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Allow localhost
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  // Block production domain
  if (host === "zulario.com" || host === "www.zulario.com") {
    return new NextResponse("Service Unavailable", {
      status: 503,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};