const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Komutları ve olayları koleksiyonlara ekleme
client.komutlar = new Collection();
const komutDosyalari = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
for (const file of komutDosyalari) {
  const komut = require(`./komutlar/${file}`);
  client.komutlar.set(komut.isim, komut);
}

const olayDosyalari = fs.readdirSync('./olaylar').filter(file => file.endsWith('.js'));
for (const file of olayDosyalari) {
  const olay = require(`./olaylar/${file}`);
  if (olay.once) {
    client.once(olay.isim, (...args) => olay.calis(client, ...args));
  } else {
    client.on(olay.isim, (...args) => olay.calis(client, ...args));
  }
}

client.on('messageCreate', async message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.komutlar.get(commandName);

  if (!command) return;

  try {
    await command.calistir(client, message);
  } catch (error) {
    console.error(error);
    message.reply('Komut yürütülürken bir hata oluştu.');
  }
});

client.login(config.token);
