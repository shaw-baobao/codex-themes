const fs = require("node:fs");
const path = require("node:path");

const { loadThemes, getThemeIndexRecord, rootDir } = require("./lib/theme-utils");

const readmePath = path.join(rootDir, "README.md");
const startMarker = "<!-- themes:start -->";
const endMarker = "<!-- themes:end -->";

function toTitleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildTable(records) {
  const header = [
    "| Theme | Mode | Preview | Import | Tags |",
    "| --- | --- | --- | --- | --- |"
  ];
  const rows = records.map((record) => {
    const name = `[${record.name}](./${record.readme})`;
    const mode = toTitleCase(record.mode);
    const preview = `![${record.name}](./${record.preview})`;
    const importLink = `[import.txt](./${record.import})`;
    const tags = record.tags.join(", ");

    return `| ${name} | ${mode} | ${preview} | ${importLink} | ${tags} |`;
  });

  return [...header, ...rows].join("\n");
}

function generateReadme() {
  const source = fs.readFileSync(readmePath, "utf8");
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("README theme markers are missing or invalid.");
  }

  const records = loadThemes().map(getThemeIndexRecord);
  const table = buildTable(records);
  const next = `${source.slice(0, startIndex + startMarker.length)}\n${table}\n${source.slice(endIndex)}`;

  fs.writeFileSync(readmePath, next, "utf8");
  console.log(`wrote ${path.relative(process.cwd(), readmePath)}`);
}

if (require.main === module) {
  generateReadme();
}

module.exports = {
  generateReadme
};
