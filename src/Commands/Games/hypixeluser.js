var numeral = require('numeral')
module.exports = {
  name: 'hypixeluser',
  aliases: ['hyuser'],
  category: 'Games',
  description: 'View information about a user on Hypixel',
  usage: '<username / uuid>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const uuid = await client.fetch(`https://playerdb.co/api/player/minecraft/${args}`).then(res => res.json())
    const hypixel = await client.fetch(`https://api.slothpixel.me/api/players/${uuid.data.player.id}`).then(res => res.json())
    const status = await client.fetch(`https://api.hypixel.net/status?key=${process.env.HYPIXEL}&uuid=${uuid.data.player.id}`).then(res => res.json())
    const embed = new client.Embed()
      .addField('Status', status.session.online ? `${client.Emojis.online} Online` : `${client.Emojis.offline} Offline`, true)
      .addField('Rank', hypixel.rank, true) // someone make me look nice
      .addField('\u200b', '\u200b', true)
    if (status.session.online) embed.addField('Gamemode', status.session.gameType, true)
    if (status.session.online) embed.addField('Mode', status.session.mode, true)
    if (status.session.online && status.session.map) embed.addField('Map', status.session.map, true)
    embed
      .setTitle(hypixel.username)
      .setThumbnail(`https://crafatar.com/avatars/${hypixel.uuid}?size=512&default=MHF_Steve&overlay`)
      .setImage(`https://gen.plancke.io/exp/${hypixel.username}.png`)
      .setColor(status.session.online ? 'GREEN' : 'RED')
      .addField('Karma', numeral(hypixel.karma).format('0.0a'), true)
      .addField('EXP', numeral(hypixel.exp).format('0.0a'), true)
      .addField('Level', hypixel.level, true)
      .addField('Total Wins', hypixel.total_wins, true)
      .addField('Total Kills', hypixel.total_kills, true)
    msg.channel.send(embed)
  }
}
