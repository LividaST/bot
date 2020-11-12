const express = require('express')
const bodyParser = require('body-parser')
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const client = require(`${process.cwd()}/src/index.js`)
const app = express()
const port = process.env.PORT
var listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener._connectionKey.split('::::')[1])
})

app.use(bodyParser.json())

app.post('/radioStats', async function (req, res) {
  const data = req.body
  const message = await client.channels.cache.get('656498576377118760').messages.fetch('754368917367029770')
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
  const thumbnail = data.dj.avatar

  Canvas.registerFont(`${process.cwd()}/assets/bold.otf`, { family: 'SF Pro Display' })
  Canvas.registerFont(`${process.cwd()}/assets/font.otf`, { family: 'SF Pro Display Light' })
  const canvas = Canvas.createCanvas(800, 360)
  const ctx = canvas.getContext('2d')

  const background = await Canvas.loadImage(`${process.cwd()}/assets/waves.png`)
  ctx.fillStyle = '#1f1f1f'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
  const songimage = await Canvas.loadImage(thumbnail)
  ctx.drawImage(songimage, 100, canvas.height / 2 - 150 / 2, 150, 150)

  ctx.font = '30px "SF Pro Display"'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(`${data.dj.username} has gone live!`, 275, 170)
  ctx.font = '20px "SF Pro Display Light"'
  ctx.fillText('livida.net', 275, 195)
  const attachment = new MessageAttachment(canvas.toBuffer(), 'nowplaying.png')
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
