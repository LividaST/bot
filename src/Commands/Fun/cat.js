module.exports = {
  name: 'cat',
  aliases: [],
  category: 'Fun',
  description: 'Get a random cat!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    // client.fetch('http://aws.random.cat/meow').then(res => res.json())
    //   .then(json => {
    //     const embed = new client.Embed()
    //       .setAuthor('🐱 Random Cat')
    //       .setImage(json.file)
    //       .setFooter('Provided by random.cat')
    //     msg.channel.send(embed)
    //   })
    msg.reply('Will be fixed soon, random.cat is down.')
  }
}
