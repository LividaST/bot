const { Utils } = require('erela.js')

module.exports = {
  name: 'play',
  aliases: ['p'],
  category: 'Music',
  description: 'Play a song!',
  usage: '[query | url]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SPEAK',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const { channel } = msg.member.voice
    if (!channel) return msg.channel.send(new client.Embed().error('You need to be in a voice channel to play music!'))

    const permissions = channel.permissionsFor(client.user)
    if (!permissions.has('CONNECT')) return msg.channel.send(new client.Embed().error('I cannot connect to your voice channel, make sure I have permission to!'))
    if (!permissions.has('SPEAK')) return msg.channel.send(new client.Embed().error('I cannot connect to your voice channel, make sure I have permission to!'))

    if (!args[0]) return msg.channel.send(new client.Embed().error('Please provide a song name or link to search!'))

    const player = client.music.players.spawn({
      guild: msg.guild,
      textChannel: msg.channel,
      voiceChannel: channel
    })

    client.music.search(args.join(' '), msg.author).then(async res => {
      switch (res.loadType) {
        case 'TRACK_LOADED':
          player.queue.add(res.tracks[0])
          if (player.playing) msg.channel.send(new client.Embed().success(`Enqueued **${res.tracks[0].title}**. This song will play for \`${Utils.formatTime(res.tracks[0].duration, true)}\``))
          if (!player.playing) player.play()
          break

        case 'SEARCH_RESULT':
          let index = 1
          const tracks = res.tracks.slice(0, 5)
          const embed = new client.Embed()
            .setAuthor('Song Selection.', msg.author.displayAvatarURL)
            .setColor('BLUE')
            .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
            .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection")
          await msg.channel.send(embed)

          const collector = msg.channel.createMessageCollector(m => {
            return m.author.id === msg.author.id && new RegExp('^([1-5]|cancel)$', 'i').test(m.content)
          }, { time: 30000, max: 1 })

          collector.on('collect', m => {
            if (/cancel/i.test(m.content)) return collector.stop(new client.Embed().error('Cancelled')).then(m => m.delete(10000))

            const track = tracks[Number(m.content) - 1]
            player.queue.add(track)
            if (player.playing) msg.channel.send(new client.Embed().success(`Enqueued **${track.title}**. This song will play for \`${Utils.formatTime(track.duration, true)}\``))
            if (!player.playing) player.play()
          })

          collector.on('end', (_, reason) => {
            if (['time', 'cancelled'].includes(reason)) return msg.channel.send(new client.Embed().error('Cancelled selection')).then(m => m.delete(10000))
          })
          break

        case 'PLAYLIST_LOADED':
          res.playlist.tracks.forEach(track => player.queue.add(track))
          const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true)
          if (player.playing) msg.channel.send(new client.Embed().success(`Enqueued **${res.playlist.tracks.length}** tracks in playlist **${res.playlist.info.name}**. This will play for \`${duration}\``))
          if (!player.playing) player.play()
          break
      }
    }).catch(err => {
      client.log(err)
      return client.Errors.unknownErr(msg, err)
    })
  }
}
