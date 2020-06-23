const crypto = require('crypto')
module.exports = {
  name: 'gravatar',
  aliases: [],
  category: 'Information',
  description: 'Gets the gravatar image from an email.',
  usage: '[email]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    var hash = crypto.createHash('md5').update(args[0]).digest('hex')
    client.fetch(`https://gravatar.com/${hash}.json`).then(res => res.json())
      .then(json => {
        const embed = new client.Embed()
          .setDescription(json.id)
        msg.channel.send(embed)
      })
  }
}
