module.exports = {
  name: 'pause',
  aliases: ['unpause', 'resume'],
  category: 'Music',
  description: 'Pause or unpause the music!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const { channel } = msg.member.voice
    const player = client.music.players.get(msg.guild.id)
    if (msg.member.roles.cache.some(role => role.name === 'DJ') === false) return msg.channel.send(new client.Embed().error('You need to have the role called `DJ` to use this command.'))
    if (!player) return msg.channel.send(new client.Embed().error('No songs currently playing in this server!'))
    if (!channel || channel.id !== player.voiceChannel.id) return msg.channel.send(new client.Embed().error('You need to be in the same voice channel as me to use the leave command!'))

    player.pause(player.playing)
    return msg.channel.send(new client.Embed().success(`The queue is now **${player.playing ? 'resumed' : 'paused'}**!`))
  }
}
