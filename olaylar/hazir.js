module.exports = {
  isim: 'ready',
  once: true,
  calis(client) {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı ve hazır!`);

    client.user.setPresence({
      activities: [{ name: 'Cheff Was Here!', type: 'PLAYING' }],
      status: 'online'
    });
  }
};
