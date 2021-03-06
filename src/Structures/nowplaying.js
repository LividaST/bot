const { Canvas, resolveImage } = require('canvas-constructor')
const { registerFont } = require('canvas')
const Vibrant = require('node-vibrant')
const fetch = require('node-fetch')

exports.nowplaying = async () => {
  const data = await fetch('https://livida.net/api/radio/').then(res => res.json())
  const title = data.nowplaying.song.name.length > 30 ? data.nowplaying.song.name.substring(0, 27) + '...' : data.nowplaying.song.name
  const artist = data.nowplaying.artist.name
  const dj = data.dj.username
  const thumbnail = await resolveImage(data.nowplaying.album.art)
  const djicon = await resolveImage(data.dj.avatar)
  const colours = await Vibrant.from(data.nowplaying.album.art).maxColorCount(2).getPalette()

  registerFont(`${process.cwd()}/assets/OpenSans-Bold.ttf`, { family: 'OpenSans Bold' })
  registerFont(`${process.cwd()}/assets/OpenSans-Regular.ttf`, { family: 'OpenSans' })

  const nowplaying = new Canvas(1630, 670)
    .save()
    .beginPath()
    .bezierCurveTo(0, 564, 815, 780, 1630, 564)
    .lineTo(1630, 0)
    .lineTo(0, 0)
    .stroke()
    .printLinearColorGradient(815, 0, 815, 670, [{ position: 0, color: colours.LightVibrant.getHex() }, { position: 100, color: colours.DarkVibrant.getHex() }])
    .fill()
    .restore()
    .printRoundedImage(thumbnail, 330, 125, 350, 350, 25)
    .setTextAlign('center')
    .setTextFont('36px OpenSans Bold')
    .setColor('#FFFFFF')
    .printText(title, 505, 520)
    .setTextFont('36px OpenSans')
    .printText(artist, 505, 565)
    .printCircularImage(djicon, 1125, 300, 175)
    .setTextFont('36px OpenSans Bold')
    .printText(dj, 1125, 520)
    .toBuffer()
  return nowplaying
}
