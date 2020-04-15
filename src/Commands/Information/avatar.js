module.exports = {
  name: 'avatar',
  aliases: ['av', 'pfp'],
  category: 'Information',
  description: 'Shows the avatar of you, or a specified guild member.',
  usage: '[user]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    let user;
    if (msg.mentions.users.size) user = msg.mentions.users.first()
    if (!user) user = msg.author;
    
    const embed = new client.Embed()
      .setAuthor(`${user.tag}'s avatar • Requested by ${msg.author.tag}`, msg.author.avatarURL())
      .setDescription(`\`\`\`${user.avatarURL()}\`\`\``)
      .setColor(msg.guild.me.roles.color || 'PURPLE')
      .setImage(user.avatarURL())
    msg.channel.send(embed)
  }
}
