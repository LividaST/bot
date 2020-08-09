const client = require(`${process.cwd()}/src/index.js`)
module.exports = async function (data) {
  const message = await client.channels.cache.get('705973641048883241').messages.fetch('742043689341419532')
  const embed = new client.Embed()
    .setTitle('Livida | Radio')
    .addField('Song', data.now_playing.song.text)
    .addField('DJ', data.live.is_live ? data.live.streamer_name : 'Auto DJ')
    .setThumbnail('https://api.livida.net/api/radio/cover')
  message.edit(embed)
  client.log('Updated radio stats')
}
