module.exports = {
    name: 'author',
    aliases: [],
    category: 'Website',
    description: 'Get information of the specified author',
    usage: '[id]',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        client.fetch(`https://livida.net/wp-json/wp/v2/users/${args}`).then(res => res.json())
        .then(json => {
            let avatar = json.avatar_urls["48"];
            let embed = new client.Embed()
                .setTitle(json.name)
                .setURL(json.link)
                .setDescription(json.description)
                .setThumbnail(avatar)
                .addField('Personal Site', json.url)
            msg.channel.send(embed);
        })
    }
  }
  
