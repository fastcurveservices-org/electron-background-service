const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "log.txt");

setInterval(() => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] Background task running\n`);
  console.log("Background task ran at", timestamp);
}, 10000); // Run every 10 seconds
