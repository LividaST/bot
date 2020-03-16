const client = require(`./src/index.js`), mongoose = require("mongoose");

async function executer(type, guildID) {
    const audit = await client.guilds.get(guildID).fetchAuditLogs({type: type}).then(audit => audit.entries.first());
    return audit.executer;
}
client
    // Guild Logs
    // Channel Logs
    .on("channelCreate", (channel) => {
        const { Logs } = require("./src/Structures/Constants/Models.js");
        let config = Logs.find({guildID: channel.guild.id});
        if(!config.guildChannelCreateLogs.enabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Channel Creation")
            .setDescription(`<#${channel.id}> has been created by **${executer("CHANNEL_CREATE", channel.guild.id)}`)
            .setTimestamp();
        if(config.messageLogsChannel.toLowerCase() === "not set") return;
        client.channels.get(config.messageLogsChannel).send(embed);

    })
    .on("channelDelete", (channel) => {

    })
    .on("", () => {})