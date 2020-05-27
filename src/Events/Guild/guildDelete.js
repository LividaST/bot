module.exports = {
  name: 'guildDelete',
  run: async (client) => {
    client.stats.increment('bot.guildDelete')
  }
}
