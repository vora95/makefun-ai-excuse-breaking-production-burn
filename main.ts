// The One-Line AI Excuse for Breaking Production — burn entry @gentle-lynx-64
// Writes exactly one line (<=180 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "I didn't break production, I merely introduced it to a new feature called downtime. The rollback is already running; my apology is still compiling.";

if (ENTRY.length < 1 || ENTRY.length > 180) {
  throw new Error(`entry must be 1-180 chars, got ${ENTRY.length}`);
}
if (/\n|\r/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read-back: the file must be byte-identical to ENTRY, no trailing newline.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars to ${outPath} (sha256 ${sha})`);
