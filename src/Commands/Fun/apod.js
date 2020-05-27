module.exports = {
  name: 'apod',
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
    client.fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA}`).then(res => res.json())
      .then(json => {
        const embed = new client.Embed()
          .setAuthor('🌌 Astronomy Picture of the Day')
          .setTitle(json.title)
          .setDescription(json.explanation)
          .setImage(json.url)
          .setFooter(`Date = ${json.date} | Provided by Nasa API`)
        msg.channel.send(embed)
      })
  }
}
