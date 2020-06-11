module.exports = {
  name: 'user',
  aliases: [],
  category: 'GitHub',
  description: 'View information about a GitHub user',
  usage: '<username>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: (client, msg, args) => {
    client.fetch(`https://api.github.com/users/${args}`).then(res => res.json())
      .then(json => {
        const error = new client.Embed().error(`The user specified \`${args}\` was not found.`)
        if (json.message === 'Not Found') return msg.channel.send(error)
        const embed = new client.Embed()
          .setTitle(json.name)
          .setURL(json.html_url)
          .setThumbnail(json.avatar_url)
          .addField('Followers', json.followers, true)
          .addField('Following', json.following, true)
          .addField('Public Repos', json.public_repos)
          .setFooter('Created at')
          .setTimestamp(json.created_at)
        if (json.bio != null) embed.setDescription(json.bio)
        msg.channel.send(embed)
      })
  }
}
