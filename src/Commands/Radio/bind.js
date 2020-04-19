module.exports = {
    name: 'bind',
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
        const data = await RadioBindings.find({guildID: msg.guild.id});
        client.users.cache.get("506899274748133376").send(JSON.stringify(data))
        if(data[1].channelID === client.getChannel(msg, args[0]).id) return msg.channel.send({embed: {description: "The bot is already bound to this channel!"}});
        if(client.getChannel(msg, args[0]).type !== "voice") return msg.reply("the specified channel is not a voice channel!");
        var query = {channelID: client.getChannel(msg, args[0]).id, binded: true};
        RadioBindings.findOneAndUpdate(query, {guildID: msg.guild.id}, {upsert: true}, function(err, doc) {
          if (err) return msg.channel.send(err);
        });
        let embed = new client.Embed()
            .setDescription(`Successfully bound the specified voice channel to the bot, when a user joins this channel, Livida Radio will be streamed to it!`)
        msg.channel.send(embed);
    }
  } 