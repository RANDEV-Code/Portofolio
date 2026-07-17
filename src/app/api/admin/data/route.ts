import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "portfolio-data.json");

/** Verify the request carries a valid admin token from localStorage. */
function isAuthorized(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token") ?? "";
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.startsWith("admin:");
  } catch {
    return false;
  }
}

/**
 * GET /api/admin/data
 * Returns the full portfolio-data.json content.
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

/**
 * POST /api/admin/data
 * Body: full portfolio data JSON object.
 * Writes the payload to portfolio-data.json.
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
