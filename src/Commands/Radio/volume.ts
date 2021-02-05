module.exports = {
    config: {
        name: "volume",
        aliases: ["vol"],
        category: "Radio",
        usage: "[volume]",
        description: "Change the volume",
        permissions: {
            developer: false
        }
    },
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel, dispatcher = client.music.get(message.guild.id);
        if (!voiceChannel) return message.channel.send(new client.Embed(message.guild.id).setDescription("You need to be in a voice channel to use this command!"));
        if(!args[0]) return message.channel.send(new client.Embed(message.guild.id).setDescription(`The volume is currently set to **${dispatcher.volume}**!`));
        if (args[0] < 0) return message.channel.send(new client.Embed(message.guild.id).setDescription(`Cannot set volume below 0, the volume is currently **${dispatcher.volume}**!`));
        if (args[0] > 5) return message.channel.send(new client.Embed(message.guild.id).setDescription(`Cannot set volume above 5, the volume is currently **${dispatcher.volume}**!`));
        dispatcher.setVolumeLogarithmic(args[0] / 5);
        message.channel.send(new client.Embed(message.guild.id).setDescription(`Volume has been updated to **${args[0]}**`));

    }
}