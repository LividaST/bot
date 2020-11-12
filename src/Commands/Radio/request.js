module.exports = {
  name: 'request',
  aliases: [],
  category: 'Radio',
  description: 'Request a track to play when a DJ is live!',
  usage: '[ song / shoutout ] [ request ]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const request = args.join(' ')
    sendRequest(request)

    function sendRequest (content) {
      const body = {
        name: msg.author.tag,
        type: 'Song Request',
        message: content,
        requestOrigin: 'Discord'
      }
      client.fetch('https://livida.net/api/radio/request', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(json => {
          const embed = new client.Embed().success('Sent the song request')
          msg.channel.send(embed)
        })
    }
  }
}
