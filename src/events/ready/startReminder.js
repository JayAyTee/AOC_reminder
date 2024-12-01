const { updateReminders } = require("../../reminder");

module.exports = async (client, interaction) => {
  await updateReminders(client);
}