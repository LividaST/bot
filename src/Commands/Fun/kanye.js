module.exports = {
  name: 'kanye',
  aliases: [''],
  category: 'Fun',
  description: 'Get a kanye quote!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    client.fetch('https://api.kanye.rest/').then(res => res.json())
      .then(json => {
        const embed = new client.Embed()
          .setAuthor('Kanye Quote')
          .setDescription(json.quote)
          .setThumbnail('https://www.nme.com/wp-content/uploads/2019/09/Kanye-West-.jpg')
          .setFooter('Provided by kanye.rest')
        msg.channel.send(embed)
      })
  }
}
