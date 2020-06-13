module.exports = {
  name: 'setprofile',
  aliases: [],
  category: 'Developer',
  description: 'Sets information on a profile a profile',
  usage: '<verify | developer | staff>',
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
        case 'staff':
          staff(msg.mentions.members.first().id)
          break
        default:
          msg.channel.send({
            embed: {
              description: 'The only options are `verify`, `developer`, `staff`.'
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
    function staff (userID) {
      var { UserProfile } = client.Models
      var query = { userID: userID }
      UserProfile.findOneAndUpdate(query, { staff: true }, { upsert: true }, function (err, doc) {
        if (err) return msg.channel.send(err)
        msg.channel.send('Successfully set as staff!')
      })
    }
  }
}
