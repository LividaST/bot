module.exports = {
  name: 'lyrics',
  aliases: [],
  category: 'Radio',
  description: 'Get lyrics of current song!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const { nowplaying } = await client.fetch('https://livida.net/api/radio').then(res => res.json())
    const lyrics = await client.ksoft.lyrics.get(nowplaying.song.name + nowplaying.artist.name).then(x => x)
    msg.channel.send(`**${nowplaying.song.name} - ${nowplaying.artist.name}**\n${lyrics.lyrics}`, { split: true })
  }
}
