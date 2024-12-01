module.exports = {
  name: "länk",
  description: "Få länken till advent of code",
  // devOnly: true,
  // testOnly: true,
  // options: Object[],

  callback: (client, interaction) => {
    interaction.reply("https://adventofcode.com/");
  }
}