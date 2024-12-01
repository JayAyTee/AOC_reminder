const fs = require("fs");
const path = require("path");
const PATH = path.join(__dirname,"..","..","DB.json");

module.exports = {
  getReminder: async (guildId) => {
    const contents = await fs.promises.readFile(PATH,"utf-8");
    return JSON.parse(contents)[guildId];
  },
  setReminder: async (guildId, reminder) => {
    const contents = await fs.promises.readFile(PATH,"utf-8");
    let json = JSON.parse(contents);
    json[guildId] = reminder;
    fs.writeFile(PATH,JSON.stringify(json),"utf-8", err => {
      if (err) {
        console.log("ERROR...");
        console.error(err);
      }
    });
  },
  getAllReminders: async () => {
    const contents = await fs.promises.readFile(PATH,"utf-8");
    return JSON.parse(contents);
  },
}