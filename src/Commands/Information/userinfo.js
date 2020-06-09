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
    const member = msg.member
    const user = msg.author
    const embed = new client.Embed()
      .setAuthor(`${user.username}'s Information`, user.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .addField('Presence', member.presence.status, true)
    if (member.displayHexColor !== '#000000') embed.setColor(member.displayHexColor)
    if (member.presence.activities[0]) embed.addField(client.formatString(msg.member.presence.activities[0].type), member.presence.activities[0], true)
    msg.channel.send(embed)
  }
}
