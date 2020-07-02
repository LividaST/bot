module.exports = {
  name: 'mcuser',
  aliases: [],
  category: 'Games',
  description: 'View information about a minecraft user',
  usage: '<username / uuid>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: (client, msg, args) => {
    client.fetch(`https://playerdb.co/api/player/minecraft/${args}`).then(res => res.json())
      .then(json => {
        if (!json.success) return msg.channel.send(new client.Embed().error(json.message))
        const embed = new client.Embed()
          .setTitle(json.data.player.username)
          .setThumbnail(`https://crafatar.com/avatars/${json.data.player.id}?size=512&default=MHF_Steve&overlay`)
          .addField('UUID', `\`${json.data.player.id}\``)
        msg.channel.send(embed)
      })
  }
}
