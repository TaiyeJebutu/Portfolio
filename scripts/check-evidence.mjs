// Fails the build if evidence.json is malformed or a published item looks unready.
import { readFileSync } from "node:fs";

const codes = new Set(["PROG","SWDN","ARCH","REQM","RLMT","PDSV","DESN","DEMG","TEST","RELM","DEPL","SINT","METL","OFCL","DLMG","PEMT"]);
const strengths = new Set(["weak", "moderate", "strong"]);

let data;
try {
  data = JSON.parse(readFileSync(new URL("../content/evidence.json", import.meta.url), "utf8"));
} catch (e) {
  console.error("content/evidence.json is not valid JSON:", e.message);
  process.exit(1);
}
if (!Array.isArray(data)) {
  console.error("content/evidence.json must be an array of evidence records.");
  process.exit(1);
}

const problems = [];
data.forEach((r, i) => {
  const at = `record ${i + 1} (${r.title ?? "untitled"})`;
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(r.date ?? "")) problems.push(`${at}: date must be YYYY-MM or YYYY-MM-DD`);
  if (!strengths.has(r.evidence_strength)) problems.push(`${at}: evidence_strength must be weak, moderate or strong`);
  for (const c of r.competencies ?? []) {
    const code = typeof c === "string" ? c : c.code;
    if (!codes.has(code)) problems.push(`${at}: unknown competency code ${code}`);
  }
  if (r.publish) {
    if (!r.publish.title || !r.publish.summary) problems.push(`${at}: publish needs a title and summary`);
    if (/example/i.test(r.publish.title)) problems.push(`${at}: published title still says "example"`);
  }
});

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
const pub = data.filter((r) => r.publish).length;
console.log(`evidence.json OK: ${data.length} records, ${pub} published.`);
