module.exports = {
  name: 'minecraft',
  aliases: ['mc'],
  category: 'Information',
  description: 'View information about a server',
  usage: '<server ip>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: (client, msg, args) => {
    client.fetch(`https://api.mcsrvstat.us/2/${args}`).then(res => res.json())
      .then(json => {
        const embed = new client.Embed()
          .setTitle(json.hostname)
          .setThumbnail(`https://api.mcsrvstat.us/icon/${args}`)
          .addField('Players', json.players.online + '/' + json.players.max, true)
        msg.channel.send(embed)
      })
  }
}
