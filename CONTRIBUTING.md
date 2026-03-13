# Contributing

Thanks for helping grow `codex-themes`.

## Add a new theme

1. Create a new folder at `themes/<slug>/`
2. Add a `theme.json` file
3. Run:

```sh
npm run build
```

4. Confirm that:

- validation passes
- `preview.svg` was generated
- `import.txt` was generated
- `themes/index.json` was updated
- the README gallery now includes the new theme

## Theme guidelines

- Keep names recognizable and easy to search
- Use lowercase kebab-case slugs
- Do not hand-edit generated previews
- Prefer one theme per pull request
- Do not hand-edit generated files unless you are updating the generator itself

## Theme folder example

```text
themes/my-theme/
├── README.md
└── theme.json
```

`preview.svg` and `import.txt` will be generated automatically.

## Review expectations

Pull requests should include:

- a valid source theme file
- a short description of the theme inspiration or origin

## Future improvements

As the repository grows, this guide can expand with:

- richer preview templates
- licensing guidance for ported themes
- contribution checklists for CLI themes
