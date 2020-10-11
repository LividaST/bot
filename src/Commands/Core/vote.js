module.exports = {
  name: 'vote',
  aliases: [],
  category: 'Core',
  description: 'Vote for the bot on TopGG',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const hasVoted = new client.Embed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`${msg.member} thanks for voting for us on top.gg`)

    const hasntVoted = new client.Embed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription('You can vote for us on top.gg [here](https://top.gg/bot/602573554780733450/vote)')
    client.dbl.hasVoted(msg.member.id).then(voted => {
      if (voted) msg.channel.send(hasVoted)
      if (!voted) msg.channel.send(hasntVoted)
    })
  }
}
