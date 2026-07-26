import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import {
  withDefaults,
  type RawPortfolioData,
} from "@/data/portfolio-defaults";

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
 * Returns the portfolio content with defaults applied.
 *
 * Defaults are merged in here rather than handed to the editors raw, so the
 * dashboard always receives every field — including ones a JSON file written
 * before those fields existed does not contain. Without this the new editors
 * would bind to `undefined` and render blank inputs, and saving would then
 * write those blanks over the live copy. Saving once also migrates the file to
 * the full structure.
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return NextResponse.json(withDefaults(JSON.parse(raw) as RawPortfolioData));
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

  /*
   * Drop any cached render of the home page.
   *
   * The page is `force-dynamic`, so its HTML is not cached server-side — but
   * Next.js also keeps a short-lived client-side Router Cache. Without this,
   * navigating from the admin panel back to "/" could still paint the previous
   * content for up to 30 seconds, which reads exactly like the save failed.
   */
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
