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
            config = Logs.find({guildID: channel.guild.id}, (err, config) => { if(err) {err} else {config}}),
            query = {guildID: msg.guild.id};

        // const values = {

        // }
        if(!args[0]) return msg.channel.send("Please provide one of the following arguments: `list, enable, disable, setChannel`").then(message => {
            msg.delete(5000);
            message.delete(5000);
        });
        function casesEmbed(input) {    
            let casesEmbed = new client.Embed()
            .setDescription(`
            ${input}
            \`
            • ${cases.join("\n•")}
            \`
            `)
            return casesEmbed;
        }
        switch(args[0].toLowerCase()) {
            case "setchannel":
                if(!args[1]) return msg.channel.send(casesEmbed("Make sure to mention which logs you want to set the channel for!"));
                switch(args[1].toLowerCase()) {
                    case "channelupdates":
                        if(!args[2]) return msg.channel.send("Make sure to provide a channel that logs will be sent too.").then(message => {
                            msg.delete(5000);
                            message.delete(5000);
                        });
                        Logs.findOneAndUpdate(query, {channelUpdatesChannel:args[2].replace(/[<#*>]/g, "")}, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully set `Channel Updates` log channel!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                }
                break;
            case "enable":
            case "true":
                if(!args[1]) return msg.channel.send(casesEmbed("Make sure to mention which logs you want to enable!"));
                switch (args[1].toLowerCase()) {
                    case "channelupdates":
                        Logs.findOneAndUpdate(query, {channelUpdatesEnabled: true }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully enabled `Channel Updates` logs!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                }
            break;
            case "disable":
            case "false":

            break;
            case "list":
            case "show":
                let configEmbed = new client.Embed()
                    .setTitle("Livida • Log configuration")
                    .setDescription(`
                    **Log Channels**
                    • Channel Updates: ${config.channelUpdatesEnabled}
                    • Member Updates: ${config.memberUpdatesEnabled}
                    • Message Updates: ${config.messageUpdatesEnabled}
                    • Emoji Updates: ${config.emojiUpdatesEnabled}
                    `)
                    msg.channel.send(configEmbed);
            break;
        }
    }
  }
  