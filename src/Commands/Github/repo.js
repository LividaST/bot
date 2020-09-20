module.exports = {
  name: 'repo',
  aliases: [],
  category: 'GitHub',
  description: 'View information about a GitHub repo',
  usage: '<username> <repo>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: (client, msg, args) => {
    if (!args[0]) return msg.reply('please specify a github profile!')
    if (!args[1]) return msg.reply('please specify a repository name!')

    client.fetch(`https://api.github.com/repos/${args[0]}/${args[1]}`).then(res => res.json())
      .then(json => {
        if (json.message) return msg.reply('the specified repository was not found!')
        const embed = new client.Embed()
          .setDescription(`Viewing information for github repository: [**${json.full_name}**](${json.html_url})\n**Description:** ${json.description}`)
        msg.channel.send(embed)
      })
  }
}
