const LCL = require('last-commit-log')
const git = new LCL()
module.exports = {
  name: 'lastupdate',
  aliases: ['update'],
  category: 'Information',
  description: 'Get the last update from commit history.',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    git.getLastCommit().then(commit => {
      const embed = new client.Embed()
        .setAuthor(commit.author.name)
        .setTitle(commit.subject)
        .setURL(commit.gitURL)
        .setDescription(commit.body)
        .addField('Hash', `\`${commit.shortHash}\``)
        .setFooter('Authored on')
        .setTimestamp(commit.author.date || 'Unknown Date')
      msg.channel.send(embed)
    })
  }
}
