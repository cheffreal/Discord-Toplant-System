const { toplantiBaslat } = require('../bileşenler/toplantiButonlari');

module.exports = {
  isim: 'interactionCreate',
  async calis(client, interaction) {
    if (!interaction.isButton()) return;

    try {
      await toplantiBaslat(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Buton etkileşimi işlenirken bir hata oluştu.', ephemeral: true });
    }
  }
};
