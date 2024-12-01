const { ApplicationCommandOptionType } = require("discord.js");
const { setReminder } = require("../utils/jsonDB");
const { validateFormat } = require("../utils/timeUtils");
const { updateReminders } = require("../reminder");

module.exports = {
  name: "setreminder",
  description: "Används för att sätta en daglig påminnelse",
  devOnly: true,
  options: [
    {
      name: "kanal",
      description: "Kanal att skicka påminnelsen i",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "tid",
      description: "Klockslag att skicka påminnelsen (HH:MM)",
      type: ApplicationCommandOptionType.String,
      required: true
    },
  ],
  callback: async (client, interaction) => {
    const channel = interaction.options.getChannel("kanal");
    const time = interaction.options.get("tid").value;

    const valid = validateFormat(time);

    if(!valid) {
      interaction.reply({
        content: `"${time}" är inte ett giltigt klockslag, vänligen försök igen med formatet HH:MM`,
        ephemeral: true,
      });
      return;
    }
    
    const reminder = {
      channelID: channel.id,
      time: time
    }
    await setReminder(interaction.guild.id,reminder);

    await updateReminders(client);

    interaction.reply(`Uppfattat, kommer påminna varje dag kl ${time} i <#${channel.id}>`);

  }
}