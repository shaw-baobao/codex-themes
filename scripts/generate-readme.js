const fs = require("node:fs");
const path = require("node:path");

const { loadThemes, getThemeIndexRecord, rootDir } = require("./lib/theme-utils");

const startMarker = "<!-- themes:start -->";
const endMarker = "<!-- themes:end -->";
const readmeConfigs = [
  {
    path: path.join(rootDir, "README.md"),
    headers: ["Theme", "Mode", "Preview", "Import", "Tags"],
    importLabel: "import.txt",
    modeLabel(mode) {
      return toTitleCase(mode);
    }
  },
  {
    path: path.join(rootDir, "README.zh-CN.md"),
    headers: ["主题", "模式", "预览", "导入", "标签"],
    importLabel: "import.txt",
    modeLabel(mode) {
      return mode === "light" ? "浅色" : "深色";
    }
  }
];

function toTitleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildTable(records, config) {
  const [themeHeader, modeHeader, previewHeader, importHeader, tagsHeader] = config.headers;
  const header = [
    `| ${themeHeader} | ${modeHeader} | ${previewHeader} | ${importHeader} | ${tagsHeader} |`,
    "| --- | --- | --- | --- | --- |"
  ];
  const rows = records.map((record) => {
    const name = `[${record.name}](./${record.readme})`;
    const mode = config.modeLabel(record.mode);
    const preview = `![${record.name}](./${record.preview})`;
    const importLink = `[${config.importLabel}](./${record.import})`;
    const tags = record.tags.join(", ");

    return `| ${name} | ${mode} | ${preview} | ${importLink} | ${tags} |`;
  });

  return [...header, ...rows].join("\n");
}

function updateReadme(records, config) {
  const source = fs.readFileSync(config.path, "utf8");
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(`${path.basename(config.path)} theme markers are missing or invalid.`);
  }

  const table = buildTable(records, config);
  const next = `${source.slice(0, startIndex + startMarker.length)}\n${table}\n${source.slice(endIndex)}`;

  fs.writeFileSync(config.path, next, "utf8");
  console.log(`wrote ${path.relative(process.cwd(), config.path)}`);
}

function generateReadme() {
  const records = loadThemes().map(getThemeIndexRecord);

  for (const config of readmeConfigs) {
    updateReadme(records, config);
  }
}

if (require.main === module) {
  generateReadme();
}

module.exports = {
  generateReadme
};
