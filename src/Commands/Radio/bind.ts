module.exports = {
    config: {
        name: "bind",
        aliases: [],
        category: "Radio",
        usage: "",
        description: "Bind Livida Radio to a voice channel!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: async (client, message, args) => {
        if(!args[0]) return message.reply("please specify a channel to bind Livida radio too.");

        let coll = client.db.collection("bindings"),
            binded = await coll.findOne({guildID: message.guild.id}),
            channel = client.getChannel(message, args[0]);

        if(!channel) return message.reply("the specified channel was not found, please provide the name or ID of the voice channel!");
        if(channel.type !== "voice") return message.reply("the specified channel is not a voice channel, please provide the name or ID of a voice channel!");
        if(binded && (binded.id === channel.id)) return message.reply("I am already bound to that channel!");

        coll.findOneAndUpdate({guildID: message.guild.id}, {$set: {channelID: channel.id, bound: true}}, {upsert: true});

        message.reply(binded ? `Livida radio has been bounded to a new channel! \`${client.getChannel(message, binded.channelID).name}\` => \`${channel.name}\`` : `you have successfully bound Livida radio to \`${channel.name}\``);
    }
}