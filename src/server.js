const express = require('express')
const bodyParser = require('body-parser')
const { MessageAttachment } = require('discord.js')
const { Canvas, resolveImage } = require('canvas-constructor')
const { registerFont } = require('canvas')
const Vibrant = require('node-vibrant')
const fetch = require('node-fetch')
const client = require(`${process.cwd()}/src/index.js`)
const app = express()
const port = process.env.PORT
var listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener._connectionKey.split('::::')[1])
})

app.use(bodyParser.json())

app.post('/radioStats', async function (req, res) {
  const data = req.body
  const message = await client.channels.cache.get('656498576377118760').messages.fetch('857821552435396649')
  const embed = new client.Embed()
    .setTitle('Livida | Radio')
    .addField('Song', data.now_playing.song.text)
    .addField('DJ', data.live.is_live ? data.live.streamer_name : 'Auto DJ')
    .setThumbnail(await deezer(data.now_playing.song.text))
  message.edit(embed)
  client.user.setActivity(`${data.now_playing.song.text} • ${process.env.PREFIX}help`, { type: 'LISTENING' })
  client.log('Updated radio stats')
  res.json({ success: true })
})

app.post('/djConnect', async function (req, res) {
  const channel = await client.channels.cache.get('735344974245396581')
  const data = await client.fetch('https://livida.net/api/radio/').then(res => res.json())
  const thumbnail = await resolveImage(data.dj.avatar)
  const colours = await Vibrant.from(data.dj.avatar).maxColorCount(2).getPalette()

  registerFont(`${process.cwd()}/assets/OpenSans-Bold.ttf`, { family: 'OpenSans Bold' })
  registerFont(`${process.cwd()}/assets/OpenSans-Regular.ttf`, { family: 'OpenSans' })

  const nowplaying = new Canvas(1630, 300)
    .printLinearColorGradient(815, 0, 815, 300, [{ position: 0, color: colours.LightVibrant.getHex() }, { position: 100, color: colours.DarkVibrant.getHex() }])
    .printRectangle(0, 0, 1630, 300)
    .printRoundedImage(thumbnail, 25, 25, 250, 250, 25)
    .setTextAlign('left')
    .setTextFont('100px OpenSans Bold')
    .setColor('#FFFFFF')
    .printText(data.dj.username, 300, 110)
    .setTextFont('75px OpenSans')
    .printText('Now live', 300, 185)
    .setTextFont('36px OpenSans Bold')
    .toBuffer()

  const attachment = new MessageAttachment(nowplaying, 'nowplaying.png')
  channel.send(attachment)
  client.log('Sent DJ connect message.')
  res.json({ success: true })
})

async function deezer (songname) {
  try {
    const { data } = await client.fetch(`https://api.deezer.com/search?q=${encodeURIComponent(songname)}&limit=1`).then(res => res.json())
    return data[0].album.cover_xl
  } catch (error) {
    console.log(error)
  }
}
