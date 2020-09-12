module.exports = {
  name: 'embed',
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
    const embed = new client.Embed()
      .setDescription('This is an embed!')
    msg.channel.send(embed)
  }
}
