const client = require(`${process.cwd()}/src/index.js`), mongoose = require("mongoose");

async function executer(type, guildID) {
    const audit = await client.guilds.get(guildID).fetchAuditLogs({type: type}).then(audit => audit.entries.first());
    return audit.executer;
}
client
    // Guild Logs
    // Channel Logs
    .on("channelCreate", async (channel) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: message.guild.id});
        const config = data[0];
        if(!config.channelUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Channel Creation")
            .setDescription(`<#${channel.id}> has been created by **${await executer("CHANNEL_CREATE", channel.guild.id)}`)
            .setTimestamp();
        if(config.channelUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.channelUpdatesChannel).send(embed);

    })
    .on("channelDelete", async (channel) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: message.guild.id});
        const config = data[0];
        if(!config.channelUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Channel Deleted")
            .setDescription(`<#${channel.id}> has been deleted by **${await executer("CHANNEL_CREATE", channel.guild.id)}`)
            .setTimestamp();
        if(config.channelUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.channelUpdatesChannel).send(embed);
    })
    .on("emojiCreate", async (emoji) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: emoji.guild.id});
        const config = data[0];
        if(!config.emojiUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Emoji Created")
            .setDescription(`An emoji called \`${emoji.name}\` has been created by **${await executer("EMOJI_CREATE", channel.guild.id)}`)
            .setTimestamp();
        if(config.emojiUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.emojiUpdatesChannel).send(embed);  
    })
    .on("emojiDelete", async (emoji) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: emoji.guild.id});
        const config = data[0];
        if(!config.emojiUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Emoji Deleted")
            .setDescription(`An emoji called \`${emoji.name}\` has been deleted by **${await executer("EMOJI_DELETE", channel.guild.id)}`)
            .setTimestamp();
        if(config.emojiUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.emojiUpdatesChannel).send(embed);  
    })
    .on("emojiUpdate", async (oldEmoji, newEmoji) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: oldEmoji.guild.id});
        const config = data[0];
        if(!config.emojiUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Emoji Updated")
            .setDescription(`An emoji called \`${oldEmoji.name}\` has been updated by **${await await executer("EMOJI_CREATE", channel.guild.id)}, the emoji's new name is \`${newEmoji.name}\``)
            .setTimestamp();
        if(config.emojiUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.emojiUpdatesChannel).send(embed);  
    })
    .on("guildMemberAdd", async (member) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: member.guild.id});
        const config = data[0];
        if(!config.memberUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Member Joined")
            .setDescription(`${member.tag} has joined the server!`)
            .setTimestamp();
        if(config.memberUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.memberUpdatesChannel).send(embed);  
    })
    .on("guildMemberRemove", async (member) => {
        const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);
        const data = await Logs.find({guildID: member.guild.id});
        const config = data[0];
        if(!config.memberUpdatesEnabled) return;
        let embed = new client.Embed()
            .setTitle("Logs • Member Leave")
            .setDescription(`${member.tag} has left the server!`)
            .setTimestamp();
        if(config.memberUpdatesChannel.toLowerCase() === "not set") return;
        client.channels.get(config.memberUpdatesChannel).send(embed);  
    })
    // TODO Add rest of events for logging