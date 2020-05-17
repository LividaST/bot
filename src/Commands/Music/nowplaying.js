const { Utils } = require("erela.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "currenttrack", "current"],
    category: "Music",
    description: "Check what the current song is",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const player = client.music.players.get(msg.guild.id);
        if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error(`No songs currently playing within this server!`));
        const { title, author, duration, requester, uri } = player.queue[0];
        let amount = `${Utils.formatTime(player.position, true)}`;
        const part = Math.floor((player.position / duration) * 10);
        const thumbnail = player.queue[0].displayThumbnail("sddefault")

        let embed = new client.Embed()
            .setTitle(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}`)
            .setURL(uri)
            .setThumbnail(thumbnail)
            .addField('Remaining', `${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)} [${amount} / ${Utils.formatTime(duration, true)}]`)
            .addField('Request By', requester)
        msg.channel.send(embed) // Requested By: ${requester.tag}`)); 
    }
};