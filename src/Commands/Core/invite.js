module.exports = {
  name: 'invite',
  aliases: [],
  category: 'Core',
  description: 'Gives you a url that can be used to invite the bot to your server!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const embed = new client.Embed()
      .setColor(msg.guild.me.roles.color.color || 'PURPLE')
      .setDescription(`You can invite \`${client.user.username}\` to your server by clicking [here](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot)!`)
    msg.channel.send(embed)
  }
}
