module.exports = {
  name: 'request',
  aliases: [],
  category: 'Music',
  description: 'Request a track to play when a DJ is live!',
  usage: '',
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
        content,
        type: request,
        name: msg.author.tag
      }
      client.fetch('https://cms.livida.net/requests', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(json => {
          const embed = new client.Embed()
            .setAuthor(`Request by ${json.name}`)
            .setDescription(json.content)
            .addField('Type', client.formatString(json.type))
            .setFooter(`ID: ${json.id} • Created at`)
            .setTimestamp(json.created_at)
          msg.channel.send(embed)
        })
    }
  }
}
