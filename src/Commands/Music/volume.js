module.exports = {
  name: 'volume',
  aliases: ['vol'],
  category: 'Music',
  description: 'Change the volume or check the current volume',
  usage: '<input>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const player = client.music.players.get(msg.guild.id)
    const { channel } = msg.member.voice
    if (msg.member.roles.cache.some(role => role.name === 'DJ') === false) return msg.channel.send(new client.Embed().error('You need to have the role called `DJ` to use this command.'))
    if (!player) return msg.channel.send(new client.Embed().error('No songs currently playing in this server!'))
    if (!channel || channel.id !== player.voiceChannel.id) return msg.channel.send(new client.Embed().error('You need to be in the same voice channel as me to use the leave command!'))
    if (!args[0]) return msg.channel.send(`Current volume: **${player.volume}**`)
    if (Number(args[0]) <= 0) return msg.channel.send(new client.Embed().error('You cannot set the volume to 0! Try using `leave` or `pause` to make me stop!'))
    if (Number(args[0]) > 100) return msg.channel.send(new client.Embed().error('You may not set the volume to more than 100!'))

    player.setVolume(Number(args[0]))

    return msg.channel.send(new client.Embed().success(`Changed the volume to **${args[0]}**!`))
  }
}
