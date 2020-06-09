module.exports = {
  name: 'addprofile',
  aliases: [],
  category: 'Developer',
  description: 'Adds a profile',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    var { UserProfile } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
    var query = { userID: msg.mentions.members.first() }
    UserProfile.findOneAndUpdate(query, { userID: msg.mentions.members.first() }, { upsert: true }, function (err, doc) {
      if (err) return msg.channel.send(err)
      msg.channel.send('Successfully created a new profile!').then(message => {
        msg.delete(5000)
        message.delete(5000)
      })
    })
  }
}
