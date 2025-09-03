import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' }
  });
}

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const user = process.env.BASIC_USER || "";
  const pass = process.env.BASIC_PASS || "";

  if (!auth || !auth.startsWith("Basic ")) {
    return unauthorized();
  }

  const b64 = auth.split(" ")[1] || "";
  let decoded = "";
  try {
    decoded = Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return unauthorized();
  }

  const [u, p] = decoded.split(":");
  if (u !== user || p !== pass) {
    return unauthorized();
  }

  return NextResponse.next();
}

// Only run on Studio routes
export const config = {
  matcher: ["/studio/:path*"]
};
