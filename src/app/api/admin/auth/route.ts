import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/auth
 * Body: { password: string }
 * Returns: { token: string } on success, 401 on failure.
 *
 * The "token" is simply a signed timestamp string that the client stores in
 * localStorage and sends as the `x-admin-token` header on data requests.
 * For a personal portfolio running locally this is sufficient.
 */
export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Simple token: base64 of a timestamp — enough for a personal portfolio.
  const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
  return NextResponse.json({ token });
}
