module.exports = {
    name: 'unbind',
    aliases: [],
    category: 'Radio',
    description: '',
    usage: '[voice_channel]',
    permissions: 'MANAGE_SERVER',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        const { RadioBindings } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await RadioBindings.find({guildID: channel.guild.id})[0];
        if(data.channelID === client.getChannel(msg, args[0]).id) return msg.channel.send({embed: {description: "The bot is already bound to this channel!"}})
        query = {channelID: client.getChannel(msg, args[0]).id, binded: true};
        RadioBindings.findOneAndUpdate(query, {guildID: msg.guild.id}, {upsert: true}, function(err, doc) {
          if (err) return msg.channel.send(err);
        });
        let embed = new client.Embed()
            .setDescription(`Successfully unbound the specified voice channel to the bot, the bot will no longer join that voice channel when a user connects!`)
        msg.channel.send(embed);
    }
  } 