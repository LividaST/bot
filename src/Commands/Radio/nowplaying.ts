import {MessageAttachment} from "discord.js";

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["stats", "onair", "currentsong", "statistics", "np"],
        category: "Radio",
        usage: "",
        description: "View the current song on Livida Radio!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: (client, message) => {
        message.channel.send(new MessageAttachment(client.nowPlaying, "nowplaying.png"));
    }
}