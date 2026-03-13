# Codex Themes

Curated themes for Codex App, with preview assets and generated import strings.

This project borrows two ideas from existing theme projects:

- [`tursunovic/xcode-themes`](https://github.com/tursunovic/xcode-themes): keep the repository visual, simple, and easy to browse.
- [`mjswensen/themer`](https://github.com/mjswensen/themer): keep a repository-owned source schema so generated files can evolve safely.

The first public version stays intentionally small:

- Codex App themes only
- one canonical `theme.json` per theme
- generated `preview.svg` files
- generated `import.txt` files
- generated `themes/index.json`
- GitHub-first preview gallery

## Why this repo exists

Theme repositories usually fail in one of two ways:

1. They become a folder dump with no quality bar.
2. They become a generator platform too early and get hard to maintain.

`codex-themes` starts in the middle:

- simple enough to contribute to
- structured enough to automate
- visual enough to browse on GitHub

## MVP scope

The MVP supports one theme type:

- `app`: themes for Codex App UI appearance

CLI syntax themes can be added later, but they are intentionally out of scope for the initial release. That keeps the schema, documentation, and contribution flow straightforward.

## Install a theme

1. Open a theme folder under [`themes/`](./themes).
2. Copy the content of `import.txt`.
3. Import it in Codex App using the app's theme import flow.

If the Codex import format changes in the future, contributors should still edit `theme.json`; the generated files can then be rebuilt by updating the scripts.

Note: `codeThemeId` is not arbitrary. It must match a built-in Codex code theme id such as `tokyo-night`, `one-dark`, `nord`, `dracula`, `catppuccin`, `gruvbox`, `solarized`, or `github-light`.

## Import in Codex App

Use the generated `import.txt` file for the theme you want.

1. Open `Settings > Appearance` in Codex App.
2. Choose `Import` in the `Light theme` section for light themes.
3. Choose `Import` in the `Dark theme` section for dark themes.
4. Open the theme's `import.txt` file in this repository.
5. Copy the entire line, starting with `codex-theme-v1:`.
6. Paste it into the import dialog.
7. Confirm the import.

Examples:

- [`themes/tokyo-night/import.txt`](./themes/tokyo-night/import.txt)
- [`themes/github-light/import.txt`](./themes/github-light/import.txt)
- [`themes/catppuccin-mocha/import.txt`](./themes/catppuccin-mocha/import.txt)

Common import failures:

- copying only the JSON body and not the `codex-theme-v1:` prefix
- pasting extra whitespace or line breaks
- importing a dark theme into the light theme slot, or the reverse
- using a `codeThemeId` that is not built into Codex App

## Repository layout

```text
codex-themes/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── docs/
│   └── schema.md
├── schemas/
│   └── theme.schema.json
├── scripts/
│   ├── build-imports.js
│   ├── build.js
│   ├── generate-index.js
│   ├── generate-previews.js
│   ├── generate-readme.js
│   ├── validate.js
│   └── lib/
│       └── theme-utils.js
├── themes/
│   ├── github-light/
│   │   ├── README.md
│   │   ├── import.txt
│   │   ├── preview.svg
│   │   └── theme.json
│   ├── index.json
│   └── tokyo-night/
│       ├── README.md
│       ├── import.txt
│       ├── preview.svg
│       └── theme.json
└── .github/
    └── workflows/
        └── ci.yml
```

## Commands

```sh
npm run validate
npm run build
```

`npm run validate` checks:

- required fields
- slug consistency
- theme type and mode
- basic color format

`npm run build`:

- regenerates `themes/*/preview.svg`
- regenerates `themes/*/import.txt`
- regenerates `themes/index.json`
- refreshes the generated theme table in this README

## Theme gallery

<!-- themes:start -->
| Theme | Mode | Preview | Import | Tags |
| --- | --- | --- | --- | --- |
| [Ayu Dark](./themes/ayu-dark/README.md) | Dark | ![Ayu Dark](./themes/ayu-dark/preview.svg) | [import.txt](./themes/ayu-dark/import.txt) | dark, warm, ayu |
| [Catppuccin Mocha](./themes/catppuccin-mocha/README.md) | Dark | ![Catppuccin Mocha](./themes/catppuccin-mocha/preview.svg) | [import.txt](./themes/catppuccin-mocha/import.txt) | dark, pastel, mocha |
| [Codex Dark](./themes/codex-dark/README.md) | Dark | ![Codex Dark](./themes/codex-dark/preview.svg) | [import.txt](./themes/codex-dark/import.txt) | dark, default, codex |
| [Dracula](./themes/dracula/README.md) | Dark | ![Dracula](./themes/dracula/preview.svg) | [import.txt](./themes/dracula/import.txt) | dark, purple, neon |
| [Everforest Dark](./themes/everforest-dark/README.md) | Dark | ![Everforest Dark](./themes/everforest-dark/preview.svg) | [import.txt](./themes/everforest-dark/import.txt) | dark, forest, muted |
| [GitHub Dark](./themes/github-dark/README.md) | Dark | ![GitHub Dark](./themes/github-dark/preview.svg) | [import.txt](./themes/github-dark/import.txt) | dark, github, clean |
| [GitHub Light](./themes/github-light/README.md) | Light | ![GitHub Light](./themes/github-light/preview.svg) | [import.txt](./themes/github-light/import.txt) | light, clean, github |
| [Gruvbox Dark](./themes/gruvbox-dark/README.md) | Dark | ![Gruvbox Dark](./themes/gruvbox-dark/preview.svg) | [import.txt](./themes/gruvbox-dark/import.txt) | dark, warm, retro |
| [Material Ocean](./themes/material-ocean/README.md) | Dark | ![Material Ocean](./themes/material-ocean/preview.svg) | [import.txt](./themes/material-ocean/import.txt) | dark, material, ocean |
| [Monokai](./themes/monokai/README.md) | Dark | ![Monokai](./themes/monokai/preview.svg) | [import.txt](./themes/monokai/import.txt) | dark, classic, monokai |
| [Night Owl](./themes/night-owl/README.md) | Dark | ![Night Owl](./themes/night-owl/preview.svg) | [import.txt](./themes/night-owl/import.txt) | dark, owl, blue |
| [Nord](./themes/nord/README.md) | Dark | ![Nord](./themes/nord/preview.svg) | [import.txt](./themes/nord/import.txt) | dark, arctic, calm |
| [One Dark](./themes/one-dark/README.md) | Dark | ![One Dark](./themes/one-dark/preview.svg) | [import.txt](./themes/one-dark/import.txt) | dark, modern, balanced |
| [Poimandres](./themes/poimandres/README.md) | Dark | ![Poimandres](./themes/poimandres/preview.svg) | [import.txt](./themes/poimandres/import.txt) | dark, poimandres, soft |
| [Rosé Pine](./themes/rose-pine/README.md) | Dark | ![Rosé Pine](./themes/rose-pine/preview.svg) | [import.txt](./themes/rose-pine/import.txt) | dark, rose-pine, soft |
| [Solarized Light](./themes/solarized-light/README.md) | Light | ![Solarized Light](./themes/solarized-light/preview.svg) | [import.txt](./themes/solarized-light/import.txt) | light, classic, muted |
| [Tokyo Night](./themes/tokyo-night/README.md) | Dark | ![Tokyo Night](./themes/tokyo-night/preview.svg) | [import.txt](./themes/tokyo-night/import.txt) | dark, blue, popular |
<!-- themes:end -->

## Theme schema

Each theme owns one human-readable source file:

```json
{
  "name": "Tokyo Night",
  "slug": "tokyo-night",
  "author": "enkia / Codex Themes",
  "type": "app",
  "mode": "dark",
  "tags": ["dark", "blue", "popular"],
  "description": "Tokyo Night adapted for Codex App with a soft blue accent.",
  "codeThemeId": "tokyo-night",
  "theme": {
    "accent": "#7aa2f7",
    "background": "#1a1b26",
    "foreground": "#c0caf5",
    "surface": "#24283b",
    "contrast": 52,
    "fonts": {
      "ui": "SF Pro Text",
      "code": "SF Mono"
    }
  }
}
```

The generated `preview.svg` and `import.txt` files are derived from this file and should not be edited by hand.

See [`docs/schema.md`](./docs/schema.md) and [`schemas/theme.schema.json`](./schemas/theme.schema.json) for the full shape.

The generated import payload uses the Codex App import shape:

- `mode` is exported as top-level `variant`
- `theme.foreground` is exported as `theme.ink`
- `theme.surface` is exported as `theme.surface`
- `theme.background` stays internal for preview generation
- `theme.opaqueWindows` defaults to `false` when omitted
- `theme.semanticColors` gets generated defaults when omitted

## Contribution flow

1. Add a new folder under `themes/<slug>/`
2. Add `theme.json`
3. Run `npm run build`
4. Open a pull request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for details.

## Roadmap

### Phase 1

- establish the app-theme schema
- collect 8 to 12 high-quality themes
- keep previews visually consistent
- make contribution review easy

### Phase 2

- add stronger schema validation
- add more preview automation
- add GitHub Pages gallery

### Phase 3

- evaluate Codex CLI theme support
- add conversion pipelines from third-party theme formats
- add web-based browsing and copy flow

## Prior art

- [`tursunovic/xcode-themes`](https://github.com/tursunovic/xcode-themes)
- [`mjswensen/themer`](https://github.com/mjswensen/themer)

The recommended strategy is:

1. Start with the gallery-first usability of `xcode-themes`
2. Keep the schema-first internals inspired by `themer`
3. Only add generators or a website after the curated repository feels solid
