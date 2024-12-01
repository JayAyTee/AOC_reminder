const { devs, testServer } = require("../../../config.json")
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: "Du får inte köra detta kommando. Womp womp",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (interaction.guild.id !== testServer) {
        interaction.reply({
          content: "Du kan inte köra kommandot här.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "Not enough permissions",
            ephemeral: true,
          });
          break;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "Jag har inte tillräckligt med permissions för detta :(",
            ephemeral: true,
          });
          break;
        }
      }
    }

    await commandObject.callback(client, interaction);
    
  } catch (err) {
    console.error("There was an error running command "+err);
  }
};