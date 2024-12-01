const { testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client);

    for (const localCommand of localCommands) {
      const { name, description, options} = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command "${name}"`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`Edited command "${name}"`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(`Skipping registration for deleted command "${name}"`);
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });
        
        console.log(`Command "${name}" was registered successfully!`);
      }
    }
  }catch (err) {
    console.error("There was an error registering the commands: "+err);
  }
};