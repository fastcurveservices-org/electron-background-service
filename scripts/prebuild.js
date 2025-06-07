const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const version = require("../package.json").version;
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

const content = `module.exports = {
  version: "${version}",
  commit: "${commitHash}"
};\n`;
const buildPath = path.join(__dirname, "../build");
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}
fs.writeFileSync("build/version.js", content);
console.log("✅ Wrote version info to build/version.js");
