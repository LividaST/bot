const { Utils } = require("erela.js");

module.exports = {
    name: "shuffle",
    aliases: [],
    category: "Music",
    description: "Shuffle the queue",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const player = client.music.players.get(msg.guild.id);
        if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error(`No songs currently playing within this server!`));
        const { voiceChannel } = msg.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.channel.send(new client.Embed().error(`You need to be in the same voice channel as me to use that!`));
        player.queue.shuffle();
        msg.channel.send(new client.Embed().success(`Shuffled the queue!`));
    }
}