const cron = require("node-cron");

function setDailyReminder() {
  cron.schedule("0 8 * * *", async () => {
	Object.entries(reminders).forEach(async ([guildId, reminder]) => {
	      const { channelId, reminderTime } = reminder;

	      const channel = await bot.channels.fetch(channelId);
	      const now = new Date();
	      const [hour, minute] = reminderTime.split(':').map(Number);

	      // Check if it's the right time to send the reminder
	      if (now.getHours() === hour && now.getMinutes() === minute) {
		channel.send(`@Deltagare_AOC_24 Dags för advent of code dag #${date.getDate()}!`);
	      }
	    });
	  });
};
