const { MessageAttachment } = require('discord.js')
module.exports = {
  name: 'radio',
  aliases: ['play', 'p'],
  category: 'Radio',
  description: 'Plays a radio station!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    // Bind Check
    const { RadioBindings } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
    const data = await RadioBindings.find({ guildID: msg.guild.id })
    if (data[0]?.binded) return msg.channel.send(new client.Embed().setDescription(`The bot is currently bound to the channel \`${client.getChannel(msg, data[0].channelID).name}\`.`).setFooter('Join the above channel to listen to the Radio'))

    const { channel } = msg.member.voice
    if (!channel) return msg.channel.send(new client.Embed().error('You need to be in a voice channel to play music!'))

    const permissions = channel.permissionsFor(client.user)
    if (!permissions.has('CONNECT')) return msg.channel.send(new client.Embed().error('I cannot connect to your voice channel, make sure I have permission to!'))
    if (!permissions.has('SPEAK')) return msg.channel.send(new client.Embed().error('I cannot connect to your voice channel, make sure I have permission to!'))

    const attachment = new MessageAttachment(await client.nowplaying.nowplaying(), 'nowplaying.png')
    client.playRadio(msg)
    msg.channel.send('**Now playing Livida!**', { files: [attachment] })
  }
}
