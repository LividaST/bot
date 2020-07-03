const moment = require('moment')

module.exports = {
  name: 'birthday',
  aliases: [],
  category: 'Profile',
  description: 'Sets birthday of yourself.',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const day = args.join(' ')
    const birthdate = moment(day).format('DD/MM/YYYY')
    if (!birthdate) return msg.channel.send(new client.Embed().error('Incorrect birthdate'))
    var { UserProfile } = client.Models
    var query = { userID: msg.author.id }

    UserProfile.findOneAndUpdate(query, { birthday: birthdate }, { upsert: true }, function (err, doc) {
      if (err) return msg.channel.send(err)
      msg.channel.send(new client.Embed().sucess(`Set brithday to ${birthdate}`))
    })
  }
}
