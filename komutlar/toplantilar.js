const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
  isim: 'toplantı',
  aciklama: 'Toplantı butonlarını oluşturur.',
  async calistir(client, message) {
    if (!message.member.roles.cache.has(config.roller.toplantiLideri)) {
      return message.reply('Bu komutu kullanma yetkiniz yok.');
    }

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('sorunCozme')
          .setLabel('Sorun Çözme Toplantısı')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('yayinciToplantisi')
          .setLabel('Yayıncı Toplantısı')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('chatToplantisi')
          .setLabel('Chat Toplantısı')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('yardimciToplantisi')
          .setLabel('Yardımcı Toplantısı')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('yetkiliAlimToplantisi')
          .setLabel('Yetkili Alım Toplantısı')
          .setStyle(ButtonStyle.Primary)
      );

    await message.channel.send({ content: 'Toplantı butonlarına tıklayın:', components: [row] });
  }
};
