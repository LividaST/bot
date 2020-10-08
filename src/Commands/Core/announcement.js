module.exports = {
  name: 'announcement',
  aliases: [],
  category: 'Core',
  description: 'Latest announcement',
  usage: '<--everyone>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const data = await client.fetch('https://cms.livida.net/announcements?_sort=created_at:DESC').then(res => res.json())
    const embed = new client.Embed()
      .setTitle(data[0].title)
      .setDescription(data[0].content)
    if (data[0].featuredImage !== null) embed.setImage(`https://cms.livida.net${data[0].featuredImage.url}`)
    if (args[0] === '--everyone' && msg.member.hasPermission('MENTION_EVERYONE')) return msg.channel.send('@everyone', { embed })
    return msg.channel.send(embed)
  }
}
