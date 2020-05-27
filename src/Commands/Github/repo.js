module.exports = {
  name: 'repo',
  aliases: [],
  category: 'GitHub',
  description: 'View information about a GitHub repo',
  usage: '<username> <repo>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: (client, msg, args) => {
    msg.channel.send('something here')
  }
}
