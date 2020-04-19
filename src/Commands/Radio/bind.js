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
        if(client.getChannel(args[0]).type !== "voice") return msg.reply("the specified channel is not a voice channel!");
        var { RadioBindings } = require(`${process.cwd()}/src/Structures/Constants/Models.js`),
        query = {channelID: client.getChannel(args[0]).id, binded: true};
        RadioBindings.findOneAndUpdate(query, {guildID: msg.guild.id}, {upsert: true}, function(err, doc) {
          if (err) return msg.channel.send(err);
        });
        let embed = new client.Embed()
            .setDescription(`Successfully bound the specified voice channel to the bot, when a user joins this channel, Livida Radio will be streamed to it!`)
        msg.channel.send(embed);
    }
  } 