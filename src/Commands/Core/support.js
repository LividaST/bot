module.exports = {
  name: 'support',
  aliases: [],
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
      .setDescription('You can get help with the bot by joining the support Discord [here](https://discord.gg/77VgNWm5W4)!')
    msg.channel.send(embed)
  }
}
