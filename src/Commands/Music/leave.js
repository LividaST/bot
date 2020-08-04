module.exports = {
  name: 'leave',
  aliases: ['stop'],
  category: 'Music',
  description: 'Stop the music playing',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const { channel } = msg.member.voice
    const player = client.music.players.get(msg.guild.id)
    if (msg.member.roles.cache.some(role => role.name === 'DJ') === 'DJ') return msg.channel.send(new client.Embed().error('You need to have the role called `DJ` to use this command.'))
    if (!player) return msg.channel.send(new client.Embed().error('No songs currently playing in this server!'))
    if (!channel || channel.id !== player.voiceChannel.id) return msg.channel.send(new client.Embed().error('You need to be in the same voice channel as me to use the leave command!'))


    client.music.players.destroy(msg.guild.id)
    return msg.channel.send(new client.Embed().success('Successfully stopped the music!'))
  }
}
