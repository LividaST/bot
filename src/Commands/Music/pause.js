module.exports = {
  name: 'pause',
  aliases: ['unpause', 'resume'],
  category: 'Music',
  description: 'Pause or unpause the music!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const { channel } = msg.member.voice
    const player = client.music.players.get(msg.guild.id)
    if (!player) return msg.channel.send(new client.Embed().error('There is nothing playing!'))
    if (channel.id !== player.voiceChannel.id || !channel) return msg.channel.send(new client.Embed().error('You are not in the same voice channel as me!'))

    player.pause(player.playing)
    return msg.channel.send(new client.Embed().success(`The queue is now **${player.playing ? 'resumed' : 'paused'}**!`))
  }
}
