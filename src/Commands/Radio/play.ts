module.exports = {
    config: {
        name: "play",
        aliases: ["join"],
        category: "Radio",
        usage: "",
        description: "Play Livida Radio",
        permissions: {
            developer: false
        }
    },
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send(new client.Embed(message.guild.id).setDescription("You need to be in a voice channel to use this command!"));

        client.music.set(message.guild.id, (await voiceChannel.join()).play("https://stream.livida.net/"));
        message.react("🎵");
    }
}