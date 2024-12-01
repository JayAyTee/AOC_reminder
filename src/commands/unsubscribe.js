const { ApplicationCommandOptionType, Colors } = require("discord.js");
const roleName = require("../../config.json");

module.exports = {
  name: "unsubscribe",
  description: "Bli av med pinget vid varje påminnelse",
  callback: async (client, interaction) => {
    const guild = interaction.guild;

    let role = guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      interaction.reply("Du får ju inte ens något ping vid varje påminnelse???");
      return;
    }
    
    await interaction.member.roles.remove(role);

    interaction.reply(`Klappat och klart! Nu slipper du att bli pingad`);
  }
}