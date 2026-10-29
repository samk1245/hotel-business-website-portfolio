import { NextResponse } from "next/server";
import { clearAdminSessionCookie, getCurrentAdminSession } from "@/lib/auth";

export async function POST() {
  await clearAdminSessionCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session });
}
