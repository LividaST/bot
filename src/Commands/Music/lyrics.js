module.exports = {
  name: 'lyrics',
  aliases: [],
  category: 'Music',
  description: 'Get lyrics of current song!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const { data: { song } } = await client.fetch('https://api.livida.net/api/radio').then(res => res.json())
    const lyrics = await client.ksoft.lyrics.get(song.name + song.artist).then(x => x)
    msg.channel.send(`**${song.name} - ${song.artist}**\n${lyrics.lyrics}`, { split: true })
  }
}
