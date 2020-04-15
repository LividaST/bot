module.exports = {
  name: 'website',
  aliases: [],
  category: 'Core',
  description: 'Gives you a link to our website!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const embed = new client.Embed()
      .setColor(msg.guild.me.roles.color || 'PURPLE')
      .setDescription('You can visit the website by clicking [here](https://livida.net)!')
    msg.channel.send(embed)
  }
}
