const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
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
    msg.channel.startTyping()
    const { data } = await client.fetch('https://api.livida.net/api/radio/').then(res => res.json())
    const title = data.song.name
    const artist = data.song.artist
    const thumbnail = data.song.art

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
    ctx.fillText(title, 275, 170)
    ctx.font = '20px "SF Pro Display Light"'
    ctx.fillText(artist, 275, 195)
    const attachment = new MessageAttachment(canvas.toBuffer(), 'nowplaying.png')
    msg.channel.stopTyping()
    await msg.channel.send(attachment)
  }
}
