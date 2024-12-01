const { getAllReminders} = require("./utils/jsonDB");
const { convertToCron } = require("./utils/timeUtils");
const cron = require("node-cron");
const { roleName } = require("../config.json");
const { reminderLog } = require("./utils/logger");

const REMINDER_TABLE = {};

async function updateReminders(client) {
  const reminders = await getAllReminders();
  for (const [id, reminder] of Object.entries(reminders)) {
    if (Object.keys(REMINDER_TABLE).includes(id)) {
      REMINDER_TABLE[id].stop();
    }
    let exp = convertToCron(reminder.time);
    let guild = client.guilds.cache.get(id);
    let channel = guild.channels.cache.get(reminder.channelID);
    let role = guild.roles.cache.find(r => r.name === roleName);
    if (!role) continue;
    REMINDER_TABLE[id] = cron.schedule(exp, () => {
      channel.send(`<@&${role.id}> Dags för Advent of Code dag #${new Date().getDate()}`);
      reminderLog(guild.name, channel.name);
    });
  }
}

module.exports = { updateReminders };