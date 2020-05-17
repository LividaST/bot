const crypto = require('crypto');
module.exports = {
    name: 'gravatar',
    aliases: [],
    category: 'Information',
    description: 'Gets the gravatar image from an email.',
    usage: '[email]',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        // var hash = crypto.createHash('md5').update(args).digest("hex");
        // client.fetch(`https://gravatar.com/${hash}.json`).then(res => res.json())
        //     .then(json => {
        //         let embed = new client.Embed()
        //            .setDescription(json.id)
        //         msg.channel.send(embed);
        //     })
        msg.channel.send('I will be fixed one day.')
    }
  }
  
