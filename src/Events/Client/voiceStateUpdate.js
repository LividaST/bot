module.exports = {
  name: 'voiceStateUpdate',
  run: async (client, oldMember, newMember) => {
    const newUserChannel = client.channels.cache.get(newMember.channelID)
    const oldUserChannel = client.channels.cache.get(oldMember.channelID)
    const { RadioBindings } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
    const data = await RadioBindings.find({ guildID: (newMember.channelID ? client.channels.cache.get(newMember.channelID).guild.id : client.channels.cache.get(oldMember.channelID).guild.id) })
    if (!data[0]) return
    if ((newMember.channelID === data[0].channelID && data[0].binded)) {
      if (newUserChannel.members.size > 2) return
      const player = client.music.players.spawn({
        guild: data[0].guildID,
        voiceChannel: newUserChannel,
        textChannel: data[0].textChannel
      })
      client.music.search('https://stream.livida.net', client.user.id).then(async res => {
        player.queue.add(res.tracks[0])
        if (!player.playing) player.play()
      })
    } else if (oldUserChannel && oldMember.channelID === data[0].channelID) {
      if (oldUserChannel.members.size < 2) {
        if (oldUserChannel.members.map(x => x.id).includes(client.user.id)) {
          client.music.players.destroy(oldUserChannel.guild.id)
        }
      }
    }
  }
}
