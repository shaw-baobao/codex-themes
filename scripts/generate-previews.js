const fs = require("node:fs");
const path = require("node:path");

const { generatedPreviewFile, loadThemes } = require("./lib/theme-utils");

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildSwatch(x, label, value, fill, textColor) {
  return `
  <g transform="translate(${x} 0)">
    <rect width="224" height="132" rx="22" fill="${fill}" stroke="${textColor}" stroke-opacity="0.14"/>
    <text x="24" y="42" fill="${textColor}" fill-opacity="0.68" font-family="SF Mono, Menlo, monospace" font-size="16">${escapeXml(label)}</text>
    <text x="24" y="88" fill="${textColor}" font-family="SF Mono, Menlo, monospace" font-size="24" font-weight="700">${escapeXml(value)}</text>
  </g>`;
}

function renderPreview(themeData) {
  const {
    name,
    mode,
    description = "",
    tags = [],
    theme
  } = themeData;
  const background = theme.background;
  const surface = theme.surface || theme.background;
  const foreground = theme.foreground;
  const accent = theme.accent;
  const modeLabel = mode.toUpperCase();
  const tagsLabel = tags.join("  •  ");

  return `<svg width="1280" height="800" viewBox="0 0 1280 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" rx="32" fill="${background}"/>
  <rect x="44" y="44" width="1192" height="712" rx="28" fill="${surface}" stroke="${foreground}" stroke-opacity="0.12"/>
  <rect x="44" y="44" width="1192" height="92" rx="28" fill="${foreground}" fill-opacity="0.06"/>
  <circle cx="96" cy="90" r="12" fill="${accent}"/>
  <circle cx="132" cy="90" r="12" fill="${foreground}" fill-opacity="0.24"/>
  <circle cx="168" cy="90" r="12" fill="${foreground}" fill-opacity="0.14"/>
  <text x="212" y="98" fill="${foreground}" font-family="SF Mono, Menlo, monospace" font-size="28">${escapeXml(
    themeData.slug
  )}</text>
  <text x="88" y="214" fill="${foreground}" fill-opacity="0.56" font-family="SF Mono, Menlo, monospace" font-size="20">CODEX APP THEME</text>
  <text x="88" y="282" fill="${foreground}" font-family="SF Mono, Menlo, monospace" font-size="58" font-weight="700">${escapeXml(
    name
  )}</text>
  <text x="88" y="334" fill="${accent}" font-family="SF Mono, Menlo, monospace" font-size="24">${escapeXml(
    modeLabel
  )}  /  contrast ${escapeXml(theme.contrast)}</text>
  <text x="88" y="388" fill="${foreground}" fill-opacity="0.76" font-family="SF Mono, Menlo, monospace" font-size="24">${escapeXml(
    description
  )}</text>
  <text x="88" y="430" fill="${foreground}" fill-opacity="0.52" font-family="SF Mono, Menlo, monospace" font-size="18">${escapeXml(
    tagsLabel
  )}</text>
  <rect x="88" y="490" width="540" height="178" rx="24" fill="${background}" stroke="${foreground}" stroke-opacity="0.1"/>
  <text x="120" y="546" fill="${accent}" font-family="SF Mono, Menlo, monospace" font-size="22">import codex-theme-v1</text>
  <text x="120" y="596" fill="${foreground}" font-family="SF Mono, Menlo, monospace" font-size="20">fonts.ui   = ${escapeXml(
    theme.fonts.ui
  )}</text>
  <text x="120" y="632" fill="${foreground}" font-family="SF Mono, Menlo, monospace" font-size="20">fonts.code = ${escapeXml(
    theme.fonts.code
  )}</text>
  <text x="120" y="668" fill="${foreground}" fill-opacity="0.62" font-family="SF Mono, Menlo, monospace" font-size="18">Generated from theme.json</text>
  <g transform="translate(680 488)">
    ${buildSwatch(0, "background", background, background, foreground)}
    ${buildSwatch(244, "surface", surface, surface, foreground)}
  </g>
  <g transform="translate(680 636)">
    ${buildSwatch(0, "accent", accent, accent, foreground)}
    ${buildSwatch(244, "foreground", foreground, foreground, background)}
  </g>
</svg>
`;
}

function generatePreviews() {
  const themes = loadThemes();

  for (const entry of themes) {
    const outputPath = path.join(entry.dir, generatedPreviewFile);
    const content = renderPreview(entry.data);
    fs.writeFileSync(outputPath, content, "utf8");
    console.log(`wrote ${path.relative(process.cwd(), outputPath)}`);
  }
}

if (require.main === module) {
  generatePreviews();
}

module.exports = {
  generatePreviews
};
