import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, "config.js");

const config = readFileSync(configPath, "utf-8");
const match = config.match(/window\.WEBOS_APP_URL\s*=\s*["']([^"']+)["']/);
const url = match?.[1];

if (!url || url === "PUBLISH_URL_HERE") {
  console.error("\n❌ Configure a URL publicada em webos-app/config.js antes de empacotar.");
  console.error("   Exemplo: window.WEBOS_APP_URL = \"https://seu-app.lovable.app\";\n");
  process.exit(1);
}

console.log(`\n✓ URL configurada: ${url}\n`);

try {
  execSync("ares --version", { stdio: "ignore" });
} catch {
  console.error("❌ ares-cli (webOS SDK) não foi encontrado no PATH.");
  console.error("   Instale em: https://webostv.developer.lge.com/develop/tools/cli-installation\n");
  process.exit(1);
}

try {
  execSync("ares-package .", {
    cwd: __dirname,
    stdio: "inherit",
  });
  console.log("\n✓ Pacote .ipk gerado com sucesso.\n");
} catch (error) {
  console.error("\n❌ Falha ao empacotar o app webOS.");
  console.error(error);
  process.exit(1);
}
