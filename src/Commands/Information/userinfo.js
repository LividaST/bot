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
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    try {
      const user = client.getUser(args[0] || message.author),
        member = client.getMember(args[0] || message.member, msg);
      
      const embed = new client.Embed()
        .setAuthor(`${user.username}'s Information`, user.avatarURL())
        .addField('**Status**', member.presence.status, true)
        .addField('**Game**', user.presence.activities[0].name || 'None', true)
        .setFooter(`Requested by ${msg.author.tag}`)
      if (member.displayHexColor !== '#000000') embed.setColor(member.displayHexColor)
      embed.addField(`**Roles [${msg.member.roles.cache.size}]**`, member.roles.cache.map(x => `${x.name}`).join(', '))
      embed.addField('**Joined at**', moment(member.joinedTimestamp).format('dddd, MMM DD, YYYY hh:mm a'), true)
      embed.addField('**Registered at**', moment(user.createdTimestamp).format('dddd, MMM DD, YYYY hh:mm a'), true)
      msg.channel.send(embed)
    } catch {
      msg.channel.send(new client.Embed().error(`The specified user \`${args[0]}\` was not found!`))
    }
  }
}
