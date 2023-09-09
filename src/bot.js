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
client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [cmdname, ...arg] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    // checks if the user has permission to use a command
    function checkPermission(permissionFlag, toBeDoneFunction) {
      if (!message.member.permissions.has(permissionFlag)) {
        return message.reply("You do not have permission");
      }
      if (arg.length === 0) {
        return message.reply("provide ID");
      }
      return toBeDoneFunction();
    }

    // kick a member
    async function kickMember() {
      try {
        const user = await message.guild.members.kick(arg[0]);
        message.reply("User was kicked")
      } catch (error) {
        message.reply("No permission, or the user was not found")
      }
    }

    // ban a member
    async function banMember() {
      try {
        const user = await message.guild.members.ban(arg[0]);
        message.reply("User was banned")
      } catch (error) {
        message.reply("No permission, or the user was not found")
      }
    }

    if (cmdname === "kick") {
      checkPermission(
        PermissionsBitField.Flags.KickMembers,
        kickMember
      );
    } else if (cmdname === "ban") {
      checkPermission(
        PermissionsBitField.Flags.BanMembers,
        banMember
      );
    }
  }
});

client.login(token);