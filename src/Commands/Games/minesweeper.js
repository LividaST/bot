const Minesweeper = require('discord.js-minesweeper')
module.exports = {
  name: 'minesweeper',
  aliases: [],
  category: 'Games',
  description: 'Play a game of minesweeper in Discord',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    const minesweeper = new Minesweeper({
      rows: 9,
      columns: 9,
      mines: 10,
      emote: 'boom',
      revealFirstCell: true,
      returnType: 'emoji'
    })
    const matrix = minesweeper.start()

    const embed = new client.Embed()
      .setAuthor('Minesweeper')
      .setDescription(matrix)
    msg.channel.send(embed)
  }
}
