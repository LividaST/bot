const { Utils } = require('erela.js')

module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'currenttrack', 'current'],
  category: 'Music',
  description: 'Check what the current song is',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const api = await client.fetch('https://api.livida.net/api/radio').then(res => res.json())
    const player = client.music.players.get(msg.guild.id)
    if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error('No songs currently playing within this server!'))
    let {
      title,
      duration,
      requester,
      uri,
      isSeekable,
      isStream,
      author
    } = player.queue[0]

    let thumbnail = player.queue[0].displayThumbnail('sddefault')

    let amount; let part; let artist; let listeners
    if (isSeekable) {
      amount = `${Utils.formatTime(player.position, true)}`
      part = Math.floor((player.position / duration) * 10)
    };
    let radio = false
    if (isStream && (author.toLowerCase() === api.find(a => author.toLowerCase() === a.toLowerCase()))) {
      radio = true
      const api = await client.fetch(`https://api.livida.net/api/radio/${author}`).then(res => res.json())
      const { data } = api
      title = data.song.name
      artist = data.song.artist
      thumbnail = data.song.art
      listeners = data.listeners
    }

    const embed = new client.Embed()
      .setTitle(`${player.playing ? '▶️' : '⏸️'} Currently Playing ${title} - ${artist}`)
      .setURL(uri)
      .setThumbnail(thumbnail)
      .setFooter('Request By ' + requester.tag)
    if (radio) {
      embed.addField('Radio', author)
      embed.addField('Listeners', listeners)
    }
    if (player.queue[0].isSeekable) embed.addField('Remaining', `${'▬'.repeat(part) + '🔘' + '▬'.repeat(10 - part)} [${amount} / ${Utils.formatTime(duration, true)}]`)
    msg.channel.send(embed)
  }
}
