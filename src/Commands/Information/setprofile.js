module.exports = {
  name: 'setprofile',
  aliases: [],
  category: 'Developer',
  description: 'Sets information on a profile a profile',
  usage: '<verify | developer>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    if (args[0]) {
      switch (args[0].toLowerCase()) {
        case 'verify':
          verify(msg.mentions.members.first().id)
          break
        case 'developer':
          developer(msg.mentions.members.first().id)
          break
        default:
          msg.channel.send({
            embed: {
              description: 'The only options are `verify`, `developer`.'
            }
          })
      }
    }

    function verify (userID) {
      var { UserProfile } = client.Models
      var query = { userID: userID }
      UserProfile.findOneAndUpdate(query, { verified: true }, { upsert: true }, function (err, doc) {
        if (err) return msg.channel.send(err)
        msg.channel.send('Successfully set as verified!')
      })
    }
    function developer (userID) {
      var { UserProfile } = client.Models
      var query = { userID: userID }
      UserProfile.findOneAndUpdate(query, { developer: true }, { upsert: true }, function (err, doc) {
        if (err) return msg.channel.send(err)
        msg.channel.send('Successfully set as developer!')
      })
    }
  }
}
