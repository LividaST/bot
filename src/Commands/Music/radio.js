module.exports = {
  name: 'radio',
  aliases: [],
  category: 'Music',
  description: 'Plays a radio station!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const { channel } = msg.member.voice
    const res = await client.fetch('https://livida-api.glitch.me/api/nowplaying').then(res => res.json())
    if (!channel) return msg.channel.send(new client.Embed().error('You need to be in a voice channel to play music!'))

    const permissions = channel.permissionsFor(client.user)
    if (!permissions.has('CONNECT')) return msg.channel.send(new client.Embed().error('I cannot connect to your voice channel, make sure I have permission to!'))
    if (!permissions.has('SPEAK')) return msg.channel.send(new client.Embed().error('I cannot connect to your voice channel, make sure I have permission to!'))

    const embed = new client.Embed()
      .setTitle('Radio List')
      .setDescription(res.join('\n'))
      .setFooter('Type your option to play')
    await msg.channel.send(embed)

    const filter = m => m.author.id === msg.author.id
    const collector = msg.channel.createMessageCollector(filter, { time: 15000 })
    collector.on('collect', async m => {
      collector.stop()
      const radioname = res.find(a => a.toLowerCase() === m.content.toLowerCase())
      if (!radioname) return msg.channel.send('stap wrong input not found okok')
      console.log(radioname)
      const data = await client.fetch(`https://livida-api.glitch.me/api/nowplaying/${radioname}`).then(res => res.json())
      const { stream } = data.data
      console.log(stream)
      const player = client.music.players.spawn({
        guild: msg.guild,
        textChannel: msg.channel,
        voiceChannel: channel
      })
      client.music.search(stream, msg.author).then(async res => {
        player.queue.add(res.tracks[0])
        if (!player.playing) player.play()
      })
    })
  }
}
