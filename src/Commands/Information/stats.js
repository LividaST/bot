const osutils = require('os-utils')
module.exports = {
  name: 'statistics',
  aliases: ['stats'],
  category: 'Information',
  description: 'Get current live statistics for the bot.',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const embed = new client.Embed()
      .setAuthor(`${client.user.username} • Information`, client.user.displayAvatarURL())
      .addField('Total Guilds', client.guilds.cache.size, true)
      .addField('Total Users', client.users.cache.size, true)
      .addField('Total Commands', client.commands.size, true)
      .addField('Developers', client.creators.tags.join(', '), true)
    msg.channel.send(embed)
  }
}
