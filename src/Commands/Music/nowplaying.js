const { Utils } = require('erela.js')

module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'currenttrack', 'current'],
  category: 'Music',
  description: 'Check what the current song is',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const player = client.music.players.get(msg.guild.id)
    if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error('No songs currently playing within this server!'))
    const {
      title,
      duration,
      requester,
      uri
    } = player.queue[0]

    let amount; let part; const seekable = player.queue[0].isSeekable
    if (seekable) {
      amount = `${Utils.formatTime(player.position, true)}`,
      part = Math.floor((player.position / duration) * 10)
    };
    const thumbnail = player.queue[0].displayThumbnail('sddefault')

    const embed = new client.Embed()
      .setTitle(`${player.playing ? '▶️' : '⏸️'} Currently Playing ${title}`)
      .setURL(uri)
      .setThumbnail(thumbnail)
      .setFooter('Request By ' + requester.tag)
    if (player.queue[0].isSeekable) embed.addField('Remaining', `${'▬'.repeat(part) + '🔘' + '▬'.repeat(10 - part)} [00:${amount} / ${Utils.formatTime(duration, true)}]`)
    msg.channel.send(embed)
  }
}
