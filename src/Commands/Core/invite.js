const { RichEmbed } = require('discord.js')

module.exports = {
  name: 'invite',
  aliases: [],
  category: 'Core',
  description: 'Shows the invite for the current bot',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const embed = new RichEmbed()
      .setTitle('Invite')
      .setColor(msg.guild.me.highestRole.color || 'BLUE')
      .setDescription(`If you would like to invite the bot you can do that [here](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
    msg.channel.send(embed)
  }
}
