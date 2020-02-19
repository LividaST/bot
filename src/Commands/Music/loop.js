module.exports = {
  name: 'loop',
  aliases: ['repeat', 'unloop', 'unrepeat'],
  category: 'Music',
  description: 'Loop a song or the queue',
  usage: '[song | queue]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const player = client.music.players.get(msg.guild.id)
    if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error('No songs currently playing within this server!'))
    const { voiceChannel } = msg.member
    if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.channel.send(new client.Embed().error('You need to be in the same voice channel as me to use that!'))

    const option = args[0]
    if (!option || option.toLowerCase() === 'song') {
      if (player.trackRepeat === false) {
        player.setTrackRepeat(true)
        msg.channel.send(new client.Embed().success('I am now looping **the current track**'))
      } else {
        player.setTrackRepeat(false)
        msg.channel.send(new client.Embed().success('I am no longer looping **the current track**'))
      };
    } else if (option.toLowerCase() === 'queue') {
      if (player.queueRepeat === false) {
        player.setQueueRepeat(true)
        msg.channel.send(new client.Embed().success('I am now looping **the entire queue**'))
      } else {
        player.setQueueRepeat(false)
        msg.channel.send(new client.Embed().success('I am no longer looping **the entire queue**'))
      };
    } else return client.Errors.invalidArgs(msg.guild, msg.channel, 'loop')
  }
}
