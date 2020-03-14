module.exports = {
  name: 'something',
  aliases: [],
  category: 'Core',
  description: 'Does something',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    msg.reply('This does something')
  }
}
