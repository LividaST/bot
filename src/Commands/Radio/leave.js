module.exports = {
  name: 'leave',
  aliases: ['stop'],
  category: 'Radio',
  description: 'Stop the music playing',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const player = client.shoukaku.getPlayer(msg.guild.id)
    const { channel } = msg.member.voice
    if (msg.member.roles.cache.some(role => role.name === 'DJ') === false) return msg.channel.send(new client.Embed().error('You need to have the role called `DJ` to use this command.'))
    if (!player) return msg.channel.send(new client.Embed().error('The radio is not playing in this server!'))
    if (!channel || channel.id !== player.voiceConnection.voiceChannelID) return msg.channel.send(new client.Embed().error('You need to be in the same voice channel as me to use the leave command!'))

    player.stopTrack()
    return msg.channel.send(new client.Embed().success('Successfully stopped the music!'))
  }
}
