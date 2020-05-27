module.exports = {
  name: 'queue',
  aliases: [],
  category: 'Music',
  description: 'Check what the current song is',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const player = client.music.players.get(msg.guild.id)
    if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error('No songs currently playing within this server!'))

    const embed = new client.Embed()
      .setTitle('Coming Soon')
    msg.channel.send(embed)
  }
}
