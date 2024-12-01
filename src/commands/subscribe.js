const { ApplicationCommandOptionType, Colors } = require("discord.js");
const { roleName } = require("../../config.json");
const { getReminder, getAllReminders} = require("../utils/jsonDB");

module.exports = {
  name: "subscribe",
  description: "Få ett ping vid varje påminnelse",
  callback: async (client, interaction) => {
    const guild = interaction.guild;
    let role = guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      role = await guild.roles.create({
        name: roleName,
        color: "#680b0b",
        reason: "Advent of code 2024 deltagare",
      });
    }
    
    await interaction.member.roles.add(role);

    const reminder = await getReminder(guild.id);

    interaction.reply(`Klappat och klart! Nu får även du en påminnelse varje dag kl ${reminder.time} i <#${reminder.channelID}>`);
  }
}