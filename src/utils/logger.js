const fs = require("fs");
const path = require("path");
const LOG_PATH = path.join(__dirname,"..","..","reminders.log");

function reminderLog(serverName, channel) {
  let message = `[${new Date().toLocaleString("sv")}] Reminded in server "${serverName}" in #${channel}`;
  console.log(message);
  fs.appendFileSync(LOG_PATH,message);
}

module.exports = { reminderLog };