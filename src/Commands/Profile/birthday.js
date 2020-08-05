const moment = require('moment')

module.exports = {
  name: 'birthday',
  aliases: [],
  category: 'Profile',
  description: 'Sets birthday of yourself.',
  usage: '[birthday dd/mm/yyyy]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const day = args.join(' ')
    const birthdate = moment.utc(day, 'DD/MM/YYYY')
    if (!birthdate) return msg.channel.send(new client.Embed().error('Incorrect birthdate'))
    var { UserProfile } = client.Models
    var query = { userID: msg.author.id }
    UserProfile.findOneAndUpdate(query, { birthday: birthdate }, { upsert: true }, function (err, doc) {
      if (err) return console.log(err)
      msg.channel.send(new client.Embed().success(`Set brithday to ${moment.utc(birthdate).format('Do MMMM, YYYY')}`))
    })
  }
}
