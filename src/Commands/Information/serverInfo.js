module.exports = {
  name: 'serverinfo',
  aliases: ['si'],
  category: 'Information',
  description: 'View a servers information',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const guild = msg.guild
    const embed = new client.Embed()
      .setAuthor(`${guild.verified ? '<:Verified:700835981133217823>' : ''} ${guild.name} • Information`, guild.iconURL() || '')
      .addField('Guild', `${guild.name} • ${guild.id}`)
      .addField('Owner', `${guild.owner.user.username} • ${guild.owner.user.id}`, true)
      .addField('Region', `${guild.region}`, true)
      .addField('Member Count', guild.memberCount)
      .setThumbnail(guild.iconURL() || '')
      .setFooter('Livida • Information')
    if (guild.premiumSubscriptionCount > 0) embed.addField('Boost Information', `Boost Count: **${guild.premiumSubscriptionCount}**, Boost Level: ${guild.premiumTier}`, true)
    if (guild.afkChannelID) embed.addField('AFK Voice Channel', `Name: ${client.getChannel(msg, guild.afkChannelID).name} • Timeout: ${guild.afkTimeout} Seconds`, true)
    if (guild.emojis.cache.size >= 1) embed.addField('Emoji Count', `${guild.emojis.cache.size}`, true)
    if (guild.vanityURLCode) embed.addField('Vanity Code', `discord.gg/**${guild.vanityURLCode}**`, true)
    msg.channel.send(embed)
  }
}
