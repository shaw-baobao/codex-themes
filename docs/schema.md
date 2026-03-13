# Theme schema

`codex-themes` stores one canonical `theme.json` file per theme.

## Required top-level fields

- `name`: human-readable theme name
- `slug`: stable kebab-case identifier
- `author`: theme author or maintainer
- `type`: currently `app`
- `mode`: `light` or `dark`
- `tags`: search-friendly labels
- `codeThemeId`: linked syntax theme identifier, if applicable
- `theme`: Codex App theme payload

## Required `theme` fields

- `accent`
- `background`
- `foreground`
- `contrast`
- `fonts.ui`
- `fonts.code`

## Optional fields

- `description`
- `theme.surface`

## Notes

- The source file is the only file contributors should edit directly.
- `preview.svg` and `import.txt` are generated from `theme.json`.
- The repository may evolve the generated format later without forcing contributors to rewrite source theme data.
