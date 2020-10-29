const crypto = require('crypto')
module.exports = {
  name: 'encoder',
  aliases: [],
  category: 'Radio',
  description: 'Give someone an encoder account',
  usage: '<@ mention>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const id = crypto.randomBytes(10).toString('hex')
    if (msg.member.roles.cache.some(role => role.id === '743738593620525117') === false) return msg.channel.send(new client.Embed().error('You need to have the role called `something here` to use this command.'))
    const body = {
      streamer_username: msg.mentions.users.first().username,
      streamer_password: id
    }
    try {
      client.fetch('https://azuracast.livida.net/api/station/1/streamers', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.AZURA }
      })
        .then(res => res.json())
        .then(json => {
          const embed = new client.Embed()
            .setTitle(`${msg.mentions.users.first().username}'s Encoder Created`)
            .setDescription(`Username: ${json.streamer_username}\nPassword: ||${body.streamer_password}||`)
            .addField('Encoder Information', 'Encoder: Icecast v2\nHost: `dj.livida.net`\nPort: `8005`')
            .addField('SAM3 Password', `||${json.streamer_username},${body.streamer_password}||`)
          msg.channel.send(new client.Embed().success('Encoder created'))
          msg.author.send(embed)
          msg.mentions.users.first().send(embed)
        })
    } catch (error) {
      msg.channel.send('Error occured, most likely encoder already exists.')
    }
  }
}
