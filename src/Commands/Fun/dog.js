module.exports = {
  name: 'dog',
  aliases: [],
  category: 'Fun',
  description: 'Get a random dog!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    client.fetch('https://random.dog/woof.json').then(res => res.json())
      .then(json => {
        const embed = new client.Embed()
          .setAuthor('🐶 Random Dog')
          .setImage(json.url)
          .setFooter('Provided by random.dog')
        msg.channel.send(embed)
      })
  }
}
