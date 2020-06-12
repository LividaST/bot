const { Canvas } = require('canvas-constructor')
const { resolve, join } = require('path')
module.exports = {
  name: 'profile',
  aliases: [],
  category: 'Information',
  description: 'Gets the user profile of the user',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    var { UserProfile } = client.Models
    const data = await UserProfile.find({ userID: msg.author.id })
    const profile = data[0]

    if (!profile) {
      msg.channel.send(new client.Embed().error('No profile has been found, a profile will now be created for you.')).then(message => {
        var query = { userID: msg.author.id }
        UserProfile.findOneAndUpdate(query, { userID: msg.author.id }, { upsert: true }, function (err, doc) {
          if (err) return msg.channel.send(err)
          const embed = new client.Embed().setDescription('Profile Created')
          message.edit(embed).then(message => {
            message.delete({ timeout: 5000 })
          })
        })
      })
    }
    const user = client.users.cache.get(profile.userID)
    const badges = (profile.verified ? client.Emojis.verified : '') + (profile.developer ? client.Emojis.developer : '') + (profile.staff ? client.Emojis.staff : '')
    const embed = new client.Embed()
      .setTitle(`${user.tag}'s Profile`)
      .setDescription(badges)
    if (profile.birthday) embed.addField('Birthday', profile.birthday)
    msg.channel.send(embed)
  }
}
