const fs = require('fs');
const data = JSON.parse(fs.readFileSync('licenses.json', 'utf8'));

let md = `<!-- LICENSE-START -->
## 📦 License Summary

| Package | Version | License | Repository |
|---------|---------|---------|------------|
`;

for (const [pkg, info] of Object.entries(data)) {
  md += `| ${pkg} | ${info.version} | ${info.licenses} | ${info.repository || ''} |\n`;
}

md += `<!-- LICENSE-END -->\n`;

fs.writeFileSync('LICENSES.md', md);
