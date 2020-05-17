module.exports = {
    name: 'author',
    aliases: [],
    category: 'Website',
    description: 'Get information of the specified author',
    usage: '',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        client.fetch(`https://livida.net/wp-json/wp/v2/users/${args}`).then(res => res.json())
        .then(json => {
            let embed = new client.Embed()
                .setTitle(json.name)
                .setURL(json.link)
                .setDescription(json.description)
                //.setThumbnail(json.avatar_urls) this won't work because i don't know js
            msg.channel.send(embed);
        })
    }
  }
  
