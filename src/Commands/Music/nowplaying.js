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
    const player = client.music.players.get(msg.guild.id)
    if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error('No songs currently playing within this server!'))
    const { title, author, duration, thumbnail, requester } = player.queue[0]
    const amount = `00:${Utils.formatTime(player.position, true)}`
    const part = Math.floor((player.position / duration) * 10)

    msg.channel.send(new client.Embed().none(`${player.playing ? '▶️' : '⏸️'} Currently Playing ${title}\n${'▬'.repeat(part) + '🔘' + '▬'.repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`))
  }
}
