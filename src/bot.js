const dotenv = require("dotenv");
dotenv.config();

const {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  Role,
  PermissionsBitField,
} = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessageReactions,
  ],
  partials: [Partials.Channel],
});
const PREFIX = "$";

// bot is live
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

//response
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [cmdname, ...arg] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    // kick command $kick ID
    if (cmdname === "kick") {
      // checks if the member has kick permission
      if (
        !message.member.permissions.has(PermissionsBitField.Flags.KickMembers)
      ) {
        return message.reply("You do not have permission");
      }
      if (arg.length === 0) {
        return message.reply("provide ID");
      }
      // kick execution
      try {
          // member ID
        const member = await message.guild.members.kick(arg[0]);
        message.reply("User was kicked")
      } catch (error) {
        message.reply("No permission, or the user was not found")
      }
    }
  }
});

client.login(token);