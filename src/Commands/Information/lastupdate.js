const git = require('git-last-commit')
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
    git.getLastCommit(function (commit) {
      const embed = new client.Embed()
        .setAuthor(commit.author.name)
        .setTitle(commit.subject)
        .setDescription(commit.body)
        .addField('Hash', `\`${commit.shortHash}\``)
        .setFooter('Authored on')
        .setTimestamp(commit.authoredOn)
      msg.channel.send(embed)
    })
  }
}
