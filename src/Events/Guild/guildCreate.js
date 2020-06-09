module.exports = {
  name: 'guildCreate',
  run: async (client, guild) => {
    client.stats.increment('bot.guildCreate')
    const channel = client.guilds.cache.get('697874510908620840').channels.cache.get('719903261246881834')
    const embed = new client.Embed()
      .setTitle(`Joined Server • ${guild.name}`)
      .addField('ID', guild.id)
      .addField('Owner', guild.owner.user.tag + ' • ' + guild.owner)
    channel.send(embed)
  }
}
