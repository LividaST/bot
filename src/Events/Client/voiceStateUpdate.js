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
      client.playRadio(data[0].guildID, newUserChannel.id)
    } else if (oldUserChannel && oldMember.channelID === data[0].channelID) {
      if (oldUserChannel.members.size < 2) {
        if (oldUserChannel.members.map(x => x.id).includes(client.user.id)) {
          const player = client.shoukaku.getPlayer(oldUserChannel.guild.id)
          player.stopTrack()
        }
      }
    }
  }
}
