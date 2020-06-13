module.exports = {
  name: 'support',
  aliases: ['help'],
  category: 'Core',
  description: 'Sends link for the support Discord and bot wiki page.',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const embed = new client.Embed()
      .setDescription('You can get help with the bot by joining the support Discord [here](https://discord.gg/SjWFhDW) or by going the bot wiki [here](https://bot.livida.net)!')
    msg.channel.send(embed)
  }
}
