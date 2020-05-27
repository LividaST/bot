module.exports = {
  name: 'lyrics',
  aliases: [''],
  category: 'Music',
  description: 'Get lyrics of current song!',
  usage: '<song title>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    msg.channel.send('Will be sorted out soon.')
  }
}
