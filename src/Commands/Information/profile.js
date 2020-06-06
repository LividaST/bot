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
    var { UserProfile } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
    const data = await UserProfile.find({ userID: msg.author.id })
    const profile = data[0]
    const user = client.users.cache.get(profile.userID)
    const embed = new client.Embed()
      .setTitle(`${user.tag}'s Profile`)
      .addField('Birthday', profile.birthday)
    if (profile.position) embed.addField('Position', profile.position)
    msg.channel.send(embed)
  }
}
