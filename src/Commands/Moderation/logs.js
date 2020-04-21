module.exports = {
    name: 'logs',
    aliases: [],
    category: 'Moderation',
    description: 'Enable/Disable certain logs in the server.',
    usage: '<enable|disable> <#channel>',
    permissions: 'MANAGE_GUILD',
    clientPerms: 'VIEW_AUDIT_LOG',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        const cases = ["channelUpdates", "memberUpdates", "emojiUpdates", "messageUpdates"]
        var { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`),
            query = {guildID: msg.guild.id};
            const data = await Logs.find({guildID: msg.guild.id})
                const config = data[0]
        if(!args[0]) return msg.channel.send("Please provide one of the following arguments: `list, enable, disable, setChannel`").then(message => {
            msg.delete(5000);
            message.delete(5000);
        });
        function casesEmbed(input) {    
            let casesEmbed = new client.Embed()
            .setDescription(`
${input}

**•** ${cases.join("\n**•** ")}
            `)
            return casesEmbed;
        }
        switch(args[0].toLowerCase()) {
            case "setchannel":
                if(!args[1]) return msg.channel.send(casesEmbed("Make sure to mention which logs you want to set the channel for!")).then(message => {msg.delete(5000);message.delete(5000);});
                if(!args[2]) return msg.channel.send("Make sure to provide a channel that logs will be sent too.").then(message => {msg.delete(5000);message.delete(5000);});
                switch(args[1].toLowerCase()) {
                    case "channelupdates":
                        Logs.findOneAndUpdate(query, {channelUpdatesChannel:args[2].replace(/[<#*>]/g, "")}, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully set `Channel Updates` log channel!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                    case "emojiupdates":
                        Logs.findOneAndUpdate(query, {emojiUpdatesChannel:args[2].replace(/[<#*>]/g, "")}, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully set `Emoji Updates` log channel!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                    case "memberupdates":
                        Logs.findOneAndUpdate(query, {memberUpdatesChannel:args[2].replace(/[<#*>]/g, "")}, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully set `Member Updates` log channel!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                    case "messageupates":
                        Logs.findOneAndUpdate(query, {messageUpdatesChannel:args[2].replace(/[<#*>]/g, "")}, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully set `Message Updates` log channel!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                    default:
                        msg.channel.send(casesEmbed("That is not a valid option!")).then(message => {msg.delete(5000);message.delete(5000);});
                    break
                }
                break;
            case "enable":
            case "true":
                if(!args[1]) return msg.channel.send(casesEmbed("Make sure to mention which logs you want to enable!"));
                switch (args[1].toLowerCase()) {
                    case "channelupdates":
                        Logs.findOneAndUpdate(query, {channelUpdatesEnabled: true }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully enabled `Channel Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    case "emojiupdates":
                        Logs.findOneAndUpdate(query, {emojiUpdatesEnabled: true }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully enabled `Emoji Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    case "memberupdates":
                        Logs.findOneAndUpdate(query, {memberUpdatesEnabled: true }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully enabled `Member Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    case "messageupdates":
                        Logs.findOneAndUpdate(query, {messageUpdatesEnabled: true }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully enabled `Message Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    default:
                        msg.channel.send(casesEmbed("That is not a valid option!")).then(message => {msg.delete(5000);message.delete(5000);});
                    break;
                }
            break;
            case "disable":
            case "false":
                if(!args[1]) return msg.channel.send(casesEmbed("Make sure to mention which logs you want to disable!"));
                switch (args[1].toLowerCase()) {
                    case "channelupdates":
                        Logs.findOneAndUpdate(query, {channelUpdatesEnabled: false }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully disabled `Channel Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    case "emojiupdates":
                        Logs.findOneAndUpdate(query, {emojiUpdatesEnabled: false }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully disabled `Emoji Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    case "memberupdates":
                        Logs.findOneAndUpdate(query, {memberUpdatesEnabled: false }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully disabled `Member Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    case "messageupdates":
                        Logs.findOneAndUpdate(query, {messageUpdatesEnabled: false }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully disabled `Message Updates` logs!").then(message => {msg.delete(5000);message.delete(5000);});
                        });
                    break;
                    default:
                        msg.channel.send(casesEmbed("That is not a valid option!")).then(message => {msg.delete(5000);message.delete(5000);});
                    break;
                }
            break;
            case "list":
            case "show":
                let description =`
*• Log: enabled/disabled • channel*

• Channel Updates • ${config.channelUpdatesEnabled} • <#${config.channelUpdatesChannel}>
• Member Updates • ${config.memberUpdatesEnabled} • <#${config.memberUpdatesChannel}>
• Message Updates • ${config.messageUpdatesEnabled} • <#${config.messageUpdatesChannel}>
• Emoji Updates • ${config.emojiUpdatesEnabled} • <#${config.emojiUpdatesChannel}>

*Logging is not yet complete and there may be some problems, or not all updates will log just yet, we will complete this soon!*
                `
                let configEmbed = new client.Embed()
                    .setTitle("Livida • Log configuration")
                    .setDescription(description.replace(/<#Not Set>/g, "No log channel set").replace(/true/g, "Enabled").replace(/false/g, "Disabled"))
                    msg.channel.send(configEmbed);
            break;
            }
        
    }
  }
  