module.exports = {
    name: 'guildCreate',
    run: async (client) => {
        client.stats.increment("bot.guildCreate");
    }
  }
  