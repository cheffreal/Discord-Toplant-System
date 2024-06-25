const { ChannelType } = require('discord.js');
const config = require('../config.json');
const meetingSessions = new Map();

async function toplantiBaslat(client, interaction) {
  const toplantıTürü = interaction.customId;
  const rolId = config.roller[toplantıTürü];
  const kategoriId = config.kategoriler.toplantilar;
  const kanalAdi = `${toplantıTürü} toplantısı`;

  if (!rolId || !kategoriId) {
    return interaction.reply('Geçersiz toplantı türü.');
  }

  try {
    const kanal = await interaction.guild.channels.create({
      name: kanalAdi,
      type: ChannelType.GuildVoice,
      parent: kategoriId
    });

    const logChannel = interaction.guild.channels.cache.find(channel => channel.name === "top-log");
    if (logChannel) {
      logChannel.send(`Toplantı ${interaction.user.tag} tarafından başlatıldı: ${kanal}`);
    }

    const startTime = Date.now();
    meetingSessions.set(kanal.id, { startTime, startedBy: interaction.user.tag });

    kanal.send(`<@&${rolId}> Toplantıya bekleniyorsunuz: ${kanal}`);
    return interaction.reply({ content: `${toplantıTürü} toplantısı başlatıldı.`, ephemeral: true });
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'Kanal oluşturulurken bir hata oluştu.', ephemeral: true });
  }
}

module.exports = { toplantiBaslat, meetingSessions };
