const { RichEmbed } = require('discord.js')

module.exports = {
  name: 'avatar',
  aliases: ['av', 'pfp'],
  category: 'Information',
  description: 'Show you the avatar of yourself',
  usage: '<username>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    let user
    if (msg.mentions.users.size) {
      user = msg.mentions.users.first() // first mention
    }
    if (!user) {
      user = msg.author // message author
    }

    const embed = new RichEmbed()
      .setTitle('Avatar')
      .setColor(msg.guild.me.highestRole.color || 'BLUE')
      .setImage(user.avatarURL)
    msg.channel.send(embed)
  }
}
