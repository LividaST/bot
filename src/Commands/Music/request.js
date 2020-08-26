module.exports = {
  name: 'request',
  aliases: [],
  category: 'Music',
  description: 'Request a track to play when a DJ is live!',
  usage: '[ song / shoutout ] [ request ]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const request = args.splice(1).join(' ')
    if (args[0]) {
      switch (args[0].toLowerCase()) {
        case 'song':
          sendRequest(request, 'song')
          break
        case 'shoutout':
          sendRequest(request, 'shoutout')
          break
        default:
          msg.channel.send({
            embed: {
              description: 'The specified request was not found, try one of the following instead: `song, shoutout`!'
            }
          })
      }
    } else {
      sendRequest(args[0], 'song')
    }

    function sendRequest (content, request) {
      const body = {
        name: msg.author.tag,
        type: request,
        message: content,
        requestOrigin: 'Discord'
      }
      client.fetch('https://api.livida.net/api/radio/requsts', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(json => {
          const { data } = json
          const embed = new client.Embed()
            .setAuthor(`Request by ${data.name}`)
            .setDescription(data.messafe)
            .addField('Type', client.formatString(data.type))
            .setFooter(`ID: ${data.uuid} • Created at`)
            .setTimestamp(data.createdAt)
          msg.channel.send(embed)
        })
    }
  }
}
