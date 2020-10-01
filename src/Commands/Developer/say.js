module.exports = {
  name: 'say',
  aliases: [],
  category: 'Developer',
  description: 'I send an embed!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    msg.channel.send(args)
  }
}
