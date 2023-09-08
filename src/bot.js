const dotenv = require("dotenv");
dotenv.config();

const { Client, Events, GatewayIntentBits, Partials, Role } = require("discord.js");
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
    const [cmdname, ...arg] = message.content.trim().substring(PREFIX.length).split(/\s+/);
  
  if (cmdname === 'kick') {
    if(arg.length === 0) return message.reply('provide ID');
    const member = message.guild.members.cache.get(arg[0]);
    if(member) {
      member.kick();
    } else {
      console.log('member not found');
    }
  }
  }
});

client.login(token);
