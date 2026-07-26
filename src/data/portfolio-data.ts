import fs from "fs";
import path from "path";
import {
  withDefaults,
  type RawPortfolioData,
  type ResolvedPortfolioData,
} from "./portfolio-defaults";

/**
 * Portfolio content loaded from `portfolio-data.json`.
 *
 * The JSON file is the single source of truth — it is written by the admin
 * panel API route (`/api/admin/data`) and read here by the Next.js server
 * component. Casting through the section prop types is intentional: the JSON
 * shape is validated by the admin API before writes, so we trust it here.
 *
 * IMPORTANT — why this reads from disk instead of `import ... from "./x.json"`:
 *
 * A static JSON import is resolved by webpack at BUILD time and inlined into
 * the bundle. Combined with the home page being prerendered as static content,
 * that meant a production build froze the portfolio to whatever the file held
 * when `next build` ran — every project added through the admin panel after
 * that was written to disk correctly but never appeared on the site until the
 * app was rebuilt. (It appeared to work in `next dev` only because the dev
 * server watches the file and recompiles the module on change.)
 *
 * Reading the file inside a function means the content is re-read on each
 * render. `src/app/page.tsx` pairs this with `export const dynamic =
 * "force-dynamic"` so the page actually re-renders per request rather than
 * being served from the full route cache.
 */

const DATA_FILE = path.join(process.cwd(), "src", "data", "portfolio-data.json");

/** The fully-resolved shape the page renders from. */
export type PortfolioData = ResolvedPortfolioData;

/**
 * Read and parse the portfolio content from disk.
 *
 * Call this during render (not at module scope) — a module-scope call would be
 * evaluated once per server process and reintroduce the staleness this exists
 * to avoid.
 *
 * The parsed JSON is passed through `withDefaults()` so a file saved before a
 * field existed — or one the admin panel wrote without it — still renders the
 * original copy instead of blank chips and empty headings.
 */
export function getPortfolioData(): PortfolioData {
  let raw: string;
  try {
    raw = fs.readFileSync(DATA_FILE, "utf-8");
  } catch (cause) {
    throw new Error(
      `Could not read portfolio data at ${DATA_FILE}. The admin panel writes this file; make sure it exists and is readable.`,
      { cause }
    );
  }

  try {
    return withDefaults(JSON.parse(raw) as RawPortfolioData);
  } catch (cause) {
    // Fail loudly rather than rendering an empty portfolio, which would look
    // like content loss instead of a malformed write.
    throw new Error(
      `portfolio-data.json is not valid JSON. It may have been left in a bad state by a failed admin save.`,
      { cause }
    );
  }
}
