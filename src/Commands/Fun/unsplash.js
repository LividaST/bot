module.exports = {
  name: 'unsplash',
  aliases: [],
  category: 'Fun',
  description: 'Get a random image from Unsplash!',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    client.fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH}`).then(res => res.json())
      .then(json => {
        const embed = new client.Embed()
          .setTitle('🖼 Random Unsplash Image')
          .setURL('https://unsplash.com/?utm_source=livida_bot&utm_medium=referral')
          .setAuthor(json.user.name, json.user.profile_image.small, json.user.links.html)
          .setImage(json.urls.regular)
          .setColor(json.color)
          .setFooter('Provided by Unsplash')
        if (json.description) embed.setDescription(json.description)
        msg.channel.send(embed)
      })
  }
}
