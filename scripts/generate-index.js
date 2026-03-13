const fs = require("node:fs");
const path = require("node:path");

const { loadThemes, getThemeIndexRecord, themesDir } = require("./lib/theme-utils");

function generateIndex() {
  const themes = loadThemes().map(getThemeIndexRecord);
  const outputPath = path.join(themesDir, "index.json");
  const output = {
    generatedAt: new Date().toISOString(),
    themes
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`wrote ${path.relative(process.cwd(), outputPath)}`);
}

if (require.main === module) {
  generateIndex();
}

module.exports = {
  generateIndex
};
