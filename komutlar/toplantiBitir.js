const { ChannelType } = require('discord.js');
const config = require('../config.json');
const { meetingSessions } = require('../bileşenler/toplantiButonlari');

module.exports = {
  isim: 'toplantibitir',
  aciklama: 'Toplantıyı bitirir ve ses kanalını siler.',
  async calistir(client, message) {
    if (!message.member.roles.cache.has(config.roller.toplantiLideri)) {
      return message.reply('Bu komutu kullanma yetkiniz yok.');
    }

    const kanal = message.member.voice.channel;
    if (!kanal || kanal.type !== ChannelType.GuildVoice) {
      return message.reply('Bir ses kanalında değilsiniz veya geçersiz bir kanal.');
    }

    try {
      const logChannel = message.guild.channels.cache.find(channel => channel.name === "top-log");
      const session = meetingSessions.get(kanal.id);
      if (session && logChannel) {
        const duration = (Date.now() - session.startTime) / 1000; // seconds
        const maxUsers = kanal.members.size;
        logChannel.send(`Toplantı ${session.startedBy} tarafından başlatıldı ve bitti.
                         Toplantı süresi: ${duration} saniye.
                         Katılan max kullanıcı sayısı: ${maxUsers}.`);
      }

      await kanal.delete();
      return message.reply('Toplantı başarıyla bitirildi ve kanal silindi.');
    } catch (error) {
      console.error(error);
      return message.reply('Kanal silinirken bir hata oluştu.');
    }
  }
};
