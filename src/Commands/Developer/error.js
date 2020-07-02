module.exports = {
  name: 'error',
  aliases: [],
  category: 'Developer',
  description: 'I spit out an error.',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    myUndefinedFunction()
    msg.channel.send('I\'ve spat out an error')
  }
}
