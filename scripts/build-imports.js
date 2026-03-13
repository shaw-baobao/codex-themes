const fs = require("node:fs");
const path = require("node:path");

const { loadThemes, getImportString } = require("./lib/theme-utils");

function buildImports() {
  const themes = loadThemes();

  for (const entry of themes) {
    const outputPath = path.join(entry.dir, "import.txt");
    fs.writeFileSync(outputPath, `${getImportString(entry.data)}\n`, "utf8");
    console.log(`wrote ${path.relative(process.cwd(), outputPath)}`);
  }
}

if (require.main === module) {
  buildImports();
}

module.exports = {
  buildImports
};
