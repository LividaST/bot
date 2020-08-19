module.exports = {
  name: 'next',
  aliases: [],
  category: 'Music',
  description: 'See what\'s coming next',
  usage: '',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const { data } = await client.fetch('https://api.livida.net/api/radio/timetable/mini').then(res => res.json())
    const embed = new client.Embed()
      .addField('NOW', data.now.username)
      .addField('NEXT', data.next.username)
      .addField('LATER', data.later.username)
    msg.channel.send(embed)
  }
}
