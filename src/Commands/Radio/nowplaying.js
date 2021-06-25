const { MessageAttachment } = require('discord.js')
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
    msg.channel.startTyping()
    const attachment = new MessageAttachment(await client.nowplaying.nowplaying(), 'nowplaying.png')
    msg.channel.stopTyping()
    await msg.channel.send(attachment)
  }
}
