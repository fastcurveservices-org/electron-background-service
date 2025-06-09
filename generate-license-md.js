const fs = require('fs');

const licenses = JSON.parse(fs.readFileSync('licenses.json', 'utf8'));

let md = `# License Summary\n\n`;
md += `| Package | Version | License | Repository |\n`;
md += `|---------|---------|---------|------------|\n`;

for (const [pkg, info] of Object.entries(licenses)) {
  md += `| ${pkg} | ${info.version || ''} | ${info.licenses || ''} | ${info.repository || ''} |\n`;
}

fs.writeFileSync('LICENSES.md', md);
