const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..", "..");
const themesDir = path.join(rootDir, "themes");
const generatedPreviewFile = "preview.svg";
const supportedCodeThemeIds = new Set([
  "absolutely",
  "ayu",
  "catppuccin",
  "codex",
  "dracula",
  "everforest",
  "github",
  "github-light",
  "gruvbox",
  "material",
  "monokai",
  "night-owl",
  "nord",
  "one-dark",
  "poimandres",
  "rose-pine",
  "solarized",
  "tokyo-night"
]);

function getThemeSlugs() {
  if (!fs.existsSync(themesDir)) {
    return [];
  }

  return fs
    .readdirSync(themesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadThemes() {
  return getThemeSlugs().map((slug) => {
    const dir = path.join(themesDir, slug);
    const filePath = path.join(dir, "theme.json");

    return {
      slug,
      dir,
      filePath,
      previewFile: generatedPreviewFile,
      data: readJson(filePath)
    };
  });
}

function isHexColor(value) {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

function validateThemeEntry(entry) {
  const { slug, data } = entry;
  const errors = [];
  const requiredKeys = [
    "name",
    "slug",
    "author",
    "type",
    "mode",
    "tags",
    "codeThemeId",
    "theme"
  ];

  for (const key of requiredKeys) {
    if (!(key in data)) {
      errors.push(`missing required field "${key}"`);
    }
  }

  if (data.slug !== slug) {
    errors.push(`theme slug "${data.slug}" does not match folder "${slug}"`);
  }

  if (data.type !== "app") {
    errors.push(`type must be "app"`);
  }

  if (!["light", "dark"].includes(data.mode)) {
    errors.push(`mode must be "light" or "dark"`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`tags must be a non-empty array`);
  }

  if (!supportedCodeThemeIds.has(data.codeThemeId)) {
    errors.push(`codeThemeId must be one of the supported Codex code theme ids`);
  }

  const theme = data.theme || {};
  const requiredColors = ["accent", "background", "foreground"];

  for (const colorKey of requiredColors) {
    if (!isHexColor(theme[colorKey])) {
      errors.push(`theme.${colorKey} must be a 6-digit hex color`);
    }
  }

  if ("surface" in theme && !isHexColor(theme.surface)) {
    errors.push(`theme.surface must be a 6-digit hex color`);
  }

  if (typeof theme.contrast !== "number" || theme.contrast < 0 || theme.contrast > 100) {
    errors.push(`theme.contrast must be a number between 0 and 100`);
  }

  if (!theme.fonts || typeof theme.fonts.ui !== "string" || typeof theme.fonts.code !== "string") {
    errors.push(`theme.fonts.ui and theme.fonts.code must be strings`);
  }

  if ("opaqueWindows" in theme && typeof theme.opaqueWindows !== "boolean") {
    errors.push(`theme.opaqueWindows must be a boolean`);
  }

  if ("semanticColors" in theme) {
    const semanticColors = theme.semanticColors;

    if (!semanticColors || typeof semanticColors !== "object" || Array.isArray(semanticColors)) {
      errors.push(`theme.semanticColors must be an object`);
    } else {
      for (const [key, value] of Object.entries(semanticColors)) {
        if (!isHexColor(value)) {
          errors.push(`theme.semanticColors.${key} must be a 6-digit hex color`);
        }
      }
    }
  }

  return errors;
}

function getImportPayload(theme) {
  const sourceTheme = theme.theme;
  const importTheme = {
    accent: sourceTheme.accent,
    contrast: sourceTheme.contrast,
    fonts: sourceTheme.fonts,
    ink: sourceTheme.foreground,
    opaqueWindows: sourceTheme.opaqueWindows ?? false,
    semanticColors: sourceTheme.semanticColors ?? {
      diffAdded: theme.mode === "dark" ? "#4ade80" : "#16a34a",
      diffRemoved: theme.mode === "dark" ? "#f87171" : "#dc2626",
      skill: sourceTheme.accent
    },
    surface: sourceTheme.surface || sourceTheme.background
  };

  return {
    codeThemeId: theme.codeThemeId,
    theme: importTheme,
    variant: theme.mode
  };
}

function getImportString(theme) {
  return `codex-theme-v1:${JSON.stringify(getImportPayload(theme))}`;
}

function toRelativePath(...segments) {
  return path.posix.join(...segments);
}

function getThemeIndexRecord(entry) {
  const theme = entry.data;

  return {
    name: theme.name,
    slug: theme.slug,
    author: theme.author,
    type: theme.type,
    mode: theme.mode,
    tags: theme.tags,
    description: theme.description || "",
    preview: toRelativePath("themes", entry.slug, entry.previewFile),
    readme: toRelativePath("themes", entry.slug, "README.md"),
    source: toRelativePath("themes", entry.slug, "theme.json"),
    import: toRelativePath("themes", entry.slug, "import.txt")
  };
}

module.exports = {
  generatedPreviewFile,
  loadThemes,
  validateThemeEntry,
  getImportString,
  getThemeIndexRecord,
  rootDir,
  supportedCodeThemeIds,
  themesDir
};
