const mongoose = require("mongoose");
module.exports = {
    name: 'logs',
    aliases: [],
    category: 'Moderation',
    description: 'Enable/Disable certain logs in the server.',
    usage: '<enable|disable> <#channel>',
    permissions: 'MANAGE_SERVER',
    clientPerms: ['MANAGE_SERVER', 'VIEW_AUDIT_LOG'],
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        var { Logs } = require("./src/Structures/Constants/Models.js"),
            query = {guildID: msg.guild.id};

        const values = {

        }
        let args = new client.Embed()
        if(!args[0]) return msg.channel.send("Please provide one of the following arguments: list, enable, disable, setChannel").then(message => {
            msg.delete(5000);
            message.delete(5000);
        });

        switch(args[0].toLowerCase()) {
            case "setchannel": {
                if(!args[2]) return msg.channel.send("Make sure to provide a channel that logs will be sent too.");
                Logs.findOneAndUpdate(query, {guildChangeLogsChannel: args[2].id }, {upsert: true}, function(err, doc) {
                    if (err) return res.send(500, {error: err});
                    return res.send('Succesfully saved.');
                });
            }
            case "enable":
            case "true":
                switch (args[1]) {
                    case "channelCreate":
                        Logs.findOneAndUpdate(query, {guildChannelCreateLogs: {enabled: true }}, {upsert: true}, function(err, doc) {
                            if (err) return res.send(500, {error: err});
                            return res.send('Succesfully saved.');
                        });
                    break;
                }
            break;
            case "disable":
            case "false":

            break;
            case "list":
            case "show":
                let embed = new client.Embed()
                    .setTitle("Livida • Log configuration")
                    .setDescription(`
                    **Log Channels**
                    • Guild Update: ${Logs.guildChangeLogsChannel}

                    **Enabled/Disabled**
                    • Channel Creation Logs: ${Logs.guildChannelCreateLogs.enabled.toString().toLowerCase().replace("true", "Enabled").replace("false", "Disabled")}
                    `)
                    message.channel.send(embed);
            break;
        }
    }
  }
  