module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'currenttrack', 'current'],
  category: 'Radio',
  description: 'Check what the current song is',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'ATTACH_FILES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const data = await client.fetch('https://livida.net/api/radio/').then(res => res.json())
    const embed = new client.Embed()
      .setTitle('Livida • Nowplaying')
      .setAuthor(data.dj.username, data.dj.avatar)
      .addField(data.nowplaying.song.name, data.nowplaying.artist.name)
    msg.channel.send(embed)
  }
}
