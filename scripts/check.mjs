#!/usr/bin/env node
/**
 * Revisión rápida antes de publicar:
 *  - cada archivo que index.html enlaza (css/, js/, img/) existe en site/
 *  - cada foto que productos.js nombra existe en site/
 *  - cada .js no tiene errores de sintaxis
 * Uso: npm run check   (también corre solo en GitHub antes de publicar)
 */
import { readFile, readdir, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const SITE = fileURLToPath(new URL("../site", import.meta.url));
let errors = 0;

const html = await readFile(join(SITE, "index.html"), "utf8");
const productos = await readFile(join(SITE, "js/productos.js"), "utf8");
const refs = [
  ...[...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m => m[1]),
  ...[...productos.matchAll(/foto:\s*"([^"]+)"/g)].map(m => m[1])
]
  .filter(u => !/^(https?:|mailto:|tel:|sms:|data:|\/\/)/.test(u))
  .map(u => u.split("?")[0])
  .filter(Boolean);
for (const r of new Set(refs)) {
  try { await access(join(SITE, r)); console.log("✓", r); }
  catch { console.error("✗ falta", r); errors++; }
}

async function jsFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await jsFiles(p)));
    else if (p.endsWith(".js")) out.push(p);
  }
  return out;
}
for (const f of await jsFiles(SITE)) {
  try { execFileSync(process.execPath, ["--check", f], { stdio: "pipe" }); }
  catch (e) { console.error("✗ error de sintaxis en", f, "\n", String(e.stderr)); errors++; }
}

const config = await readFile(join(SITE, "js/config.js"), "utf8");
if (/whatsapp:\s*""/.test(config)) console.warn("⚠ Falta el número de WhatsApp en site/js/config.js");

if (errors) { console.error(`${errors} problema(s). No publiques todavía.`); process.exit(1); }
console.log("Todo bien ✓");
