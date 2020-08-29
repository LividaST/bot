const moment = require('moment')
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
      .addField('NOW', `${data.now.username} • ${moment.unix(data.now.start).utc().format('dd HH:mm')} - ${moment.unix(data.now.end).utc().format('HH:mm')}`)
      .addField('NEXT', `${data.next.username} • ${moment.unix(data.next.start).utc().format('dd HH:mm')} - ${moment.unix(data.next.end).utc().format('HH:mm')}`)
      .addField('LATER', `${data.later.username} • ${moment.unix(data.later.start).utc().format('dd HH:mm')} - ${moment.unix(data.later.end).utc().format('HH:mm')}`)
      .setFooter('Times are in UTC')
    msg.channel.send(embed)
  }
}
