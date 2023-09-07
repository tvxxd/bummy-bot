const dotenv = require("dotenv");
dotenv.config();

const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessageReactions
  ],
  partials: [Partials.Channel]
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.once(Events.MessageCreate, (message) => {
  console.log(`[${message.author.tag}]:`);
  console.log(message.content);
  if (message.content === "hello") {
    message.reply("hello theree");
  }
});

client.login(token);
