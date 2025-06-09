const fs = require('fs');
const data = JSON.parse(fs.readFileSync('licenses.json', 'utf8'));

let html = `
  <html>
  <head>
    <title>License Report</title>
    <style>
      body { font-family: sans-serif; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 8px; }
      th { background: #f4f4f4; }
    </style>
  </head>
  <body>
    <h1>License Report</h1>
    <table>
      <tr><th>Package</th><th>Version</th><th>License</th><th>Repository</th></tr>
`;

for (const [pkg, info] of Object.entries(data)) {
  html += `<tr>
    <td>${pkg}</td>
    <td>${info.version}</td>
    <td>${info.licenses}</td>
    <td>${info.repository || ''}</td>
  </tr>`;
}

html += `
    </table>
  </body>
  </html>
`;

fs.writeFileSync('license-report.html', html);
console.log('✅ HTML license report generated as license-report.html');
