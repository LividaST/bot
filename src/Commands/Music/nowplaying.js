const { Canvas, resolveImage } = require('canvas-constructor')
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
    const { data } = await client.fetch('https://api.livida.net/api/radio/').then(res => res.json())
    const title = data.song.name
    const artist = data.song.artist
    const thumbnail = data.song.art

    const result = await client.fetch('https://cdns-images.dzcdn.net/images/cover/99e85064b5a5b9b4c04f64e5c5092c9d/1000x1000-000000-80-0-0.jpg')
    const art = await result.buffer()

    const buffer = await nowplaying()
    const filename = 'nowplaying.jpg'
    const attachment = new MessageAttachment(buffer, filename)

    await msg.channel.send(attachment)
    async function nowplaying () {
      const image = await resolveImage(`${process.cwd()}/assets/waves.png`)
      return new Canvas(800, 360)
        .setColor('#1F1F1F')
        .printRectangle(0, 0, 800, 360)
        .printImage(image, 0, 0, 800, 360)
        // .printImage(art, 400, 360, 100, 100)
        .setTextFont('20pt Ariel')
        .setColor('#FFFFFF')
        .printText(title, 520, 180)
        .setTextFont('15pt Ariel')
        .printText(artist, 520, 200)
        .toBuffer()
    }
  }
}
