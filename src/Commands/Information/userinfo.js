module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  category: 'Information',
  description: 'View a user\'s information',
  usage: '<user_id>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    msg.channel.send('Coming Soon')
  }
}
