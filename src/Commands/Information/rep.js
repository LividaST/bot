module.exports = {
  name: 'rep',
  aliases: [],
  category: 'Information',
  description: 'Shows the users reputation on discordrep',
  usage: '[user]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    try {
      let user
      if (args[0]) {
        if (msg.mentions.users.size) {
          user = msg.mentions.users.first()
        } else {
          if (client.getUser(args[0])) user = client.getUser(args[0])
        }
      } else {
        user = msg.author
      }
      const data = await client.fetch(`https://discordrep.com/api/v3/rep/${user.id}`, { headers: { Authorization: process.env.DISCORDREP } }).then(res => res.json())
      const embed = new client.Embed()
        .setAuthor(`${user.username}'s Reputation`, user.avatarURL())
        .addField('Reputation', `${data.upvotes - data.downvotes} (${data.upvotes}:${data.downvotes})`)
        .setFooter(`Requested by ${msg.author.tag}`)
      msg.channel.send(embed)
    } catch {
      msg.channel.send(new client.Embed().error(`The specified user '${args[0]}' was not found!`))
    }
  }
}
