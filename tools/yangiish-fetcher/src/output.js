import fs from "node:fs/promises";
import path from "node:path";

/**
 * Write via a temp file and rename. A run that dies halfway through must not
 * leave a truncated JSON file behind that looks like a successful result to
 * whatever reads it next.
 */
export async function writeJson(dir, filename, data) {
  await fs.mkdir(dir, { recursive: true });

  const target = path.join(dir, filename);
  const tmp = `${target}.${process.pid}.tmp`;

  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, target);

  return target;
}
