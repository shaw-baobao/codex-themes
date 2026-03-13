const { loadThemes, validateThemeEntry } = require("./lib/theme-utils");

function runValidation() {
  const themes = loadThemes();
  let hasError = false;

  if (themes.length === 0) {
    console.error("No themes found in themes/.");
    process.exitCode = 1;
    return false;
  }

  for (const entry of themes) {
    const errors = validateThemeEntry(entry);

    if (errors.length === 0) {
      console.log(`ok  ${entry.slug}`);
      continue;
    }

    hasError = true;
    console.error(`fail ${entry.slug}`);

    for (const error of errors) {
      console.error(`  - ${error}`);
    }
  }

  if (hasError) {
    process.exitCode = 1;
    return false;
  }

  console.log(`Validated ${themes.length} theme(s).`);
  return true;
}

if (require.main === module) {
  runValidation();
}

module.exports = {
  runValidation
};
