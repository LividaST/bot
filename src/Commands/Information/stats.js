// const osutils = require('os-utils')
const pjson = require(`${process.cwd()}/package.json`)
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
    const data = await client.fetch('https://api.livida.net/api/radio/').then(res => res.json())
    const embed = new client.Embed()
      .setAuthor(`${client.user.username} • Information`, client.user.displayAvatarURL())
      .addField('Total Guilds', client.guilds.cache.size, true)
      .addField('Total Users', client.users.cache.size, true)
      .addField('Total Commands', client.commands.size, true)
      .addField('Radio', `**Listeners:** ${data.listeners + client.shoukaku.totalPlayers}`)
      .addField('Developers', client.creators.tags.join(', '), true)
      .setFooter('v' + pjson.version)
    msg.channel.send(embed)
  }
}
