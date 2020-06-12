var moment = require('moment')
module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  category: 'Information',
  description: 'View a user\'s information',
  usage: '<user_id>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    try {
      let user; let member
      if (args[0]) {
        if (msg.mentions.users.size) {
          user = msg.mentions.users.first()
          member = msg.mentions.members.first()
        } else {
          if (client.getUser(args[0])) {
            user = client.getUser(args[0])
            member = client.getMember(args[0], msg)
          }
        }
      } else {
        user = msg.author
        member = msg.member
      }

      const embed = new client.Embed()
        .setAuthor(`${user.username}'s Information`, member.user.avatarURL())
        .addField('**Status**', member.presence.status, true)
        .addField('**Game**', member.user.presence.activities[0].name || 'None', true)
        .setFooter(`Requested by ${msg.author.tag}`)
      if (member.displayHexColor !== '#000000') embed.setColor(member.displayHexColor)
      if (msg.channel.type !== 'dm') {
        embed.addField(`**Roles [${msg.member.roles.cache.size}]**`, member.roles.cache.map(x => `${x.name}`).join(', '))
        embed.addField('**Joined at**', moment(member.joinedTimestamp).format('dddd, Do MMMM, YYYY hh:mm a'), true)
      }
      embed.addField('**Registered at**', moment(user.createdTimestamp).format('dddd, Do MMMM, YYYY hh:mm a'), true)
      msg.channel.send(embed)
    } catch {
      msg.channel.send(new client.Embed().error(`The specified user \`${args[0]}\` was not found!`))
    }
  }
}
