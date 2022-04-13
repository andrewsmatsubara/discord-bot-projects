require('dotenv').config();

const fetch = require('node-fetch');

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const getCatPicture = async () => {
  const result = await fetch('https://api.thecatapi.com/v1/images/search');
  const json = await result.json();
  const url = await json[0].url;

  return url;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  } else if (msg.content === '!Olá, Robô') {
    msg.reply(`Olá, ${msg.author}!`);
  } else if (msg.content === '!Adeus, Robô') {
    msg.reply(`Adeus, ${msg.author}!`);
  } else if (msg.content === '!cat') {
    msg.channel.send({
      content: 'Um gatinho para alegrar o seu dia!',
      files: [await getCatPicture()]
    });
  }
});

client.login(process.env.TOKEN);
