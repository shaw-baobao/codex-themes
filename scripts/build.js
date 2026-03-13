const { runValidation } = require("./validate");
const { buildImports } = require("./build-imports");
const { generatePreviews } = require("./generate-previews");
const { generateIndex } = require("./generate-index");
const { generateReadme } = require("./generate-readme");

function build() {
  const isValid = runValidation();

  if (!isValid) {
    process.exitCode = 1;
    return;
  }

  generatePreviews();
  buildImports();
  generateIndex();
  generateReadme();
  console.log("Build complete.");
}

if (require.main === module) {
  build();
}

module.exports = {
  build
};
