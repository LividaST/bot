const client = require(`${process.cwd()}/src/index.js`), mongoose = require("mongoose");

async function executer(type, guildID) {
    const audit = await client.guilds.get(guildID).fetchAuditLogs({type: type}).then(audit => audit.entries.first());
    return audit.executer;
}
client
    // Guild Logs
    // Channel Logs
    .on("channelCreate", (channel) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const config = Logs.find({guildID: channel.guild.id}, (err, config) => { if(err) {err} else {config}});
        if(!config.channelUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Channel Creation")
            .setDescription(`<#${channel.id}> has been created by **${executer("CHANNEL_CREATE", channel.guild.id)}`)
            .setTimestamp();
        if(config.channelUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.channelUpdatesChannel).send(embed);

    })
    .on("channelDelete", (channel) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const config = Logs.find({guildID: channel.guild.id});
        if(!config.channelUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Channel Deleted")
            .setDescription(`<#${channel.id}> has been deleted by **${executer("CHANNEL_CREATE", channel.guild.id)}`)
            .setTimestamp();
        if(config.channelUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.channelUpdatesChannel).send(embed);
    })
