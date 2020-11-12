const { Canvas, resolveImage } = require('canvas-constructor')
const { registerFont } = require('canvas')
const { MessageAttachment } = require('discord.js')
module.exports = {
  name: 'next',
  aliases: [],
  category: 'Radio',
  description: 'See what\'s coming next',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    msg.channel.startTyping()
    const { data } = await client.fetch('https://livida.net/api/radio/timetable/mini').then(res => res.json())
    const djicon1 = await resolveImage(data.now.avatar)
    const djicon2 = await resolveImage(data.next.avatar)
    const djicon3 = await resolveImage(data.later.avatar)

    registerFont(`${process.cwd()}/assets/OpenSans-Bold.ttf`, { family: 'OpenSans Bold' })
    registerFont(`${process.cwd()}/assets/OpenSans-Regular.ttf`, { family: 'OpenSans' })

    const nowplaying = new Canvas(1600, 750)
      .printRoundedRectangle(0, 0, 1600, 750, 60)
      .printLinearColorGradient(815, 0, 815, 670, [{ position: 0, color: '#8800ff' }, { position: 100, color: '#270049' }])
      .fill()
      .printCircularImage(djicon1, 310, 375, 140)
      .printCircularImage(djicon2, 800, 375, 140)
      .printCircularImage(djicon3, 1290, 375, 140)
      .setTextAlign('center')
      .setTextFont('60px OpenSans Bold')
      .setColor('#FFFFFF')
      .printText('Now', 310, 200)
      .printText('Next', 800, 200)
      .printText('Later', 1290, 200)
      .setTextFont('50px OpenSans')
      .printText(data.now.username, 310, 580)
      .printText(data.next.username, 800, 580)
      .printText(data.later.username, 1290, 580)
      .toBuffer()
    const attachment = new MessageAttachment(nowplaying, 'nowplaying.png')
    msg.channel.stopTyping()
    await msg.channel.send(attachment)
  }
}
