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
  run: async (client, msg, args) => {
    if (msg.attachments.size !== 0) {
      msg.channel.send({ files: [msg.attachments.values().next().value.attachment] })
      msg.delete()
      return
    }
    msg.channel.send(args.join(' '))
    msg.delete()
  }
}
