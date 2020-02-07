const cooldown = new Set();
const talked = new Set();

module.exports = {
    name: "message",
    run: async (client, msg) => {
        if(msg.author.bot) return;
        if(msg.channel.type == "dm") {
            
        };

        if(!msg.guild) return;

        const settings = await client.Models.Logs.findOne({
            guildID: msg.guild.id,
        });
        if(settings !== null && settings.antiSpam === true) {
            if(talked.has(msg.author.id)) {
                msg.delete(`${msg.author.tag} was spamming!`);
                msg.channel.send(`${client.Emojis.x} You are sending messages to quickly **${msg.author.username}**#${msg.author.discriminator}!`).then(m => m.delete(10000));
                setTimeout(function() {
                    talked.delete(msg.author.id);
                }, 1000);
            } else {
                talked.add(msg.author.id);
                setTimeout(function() {
                    talked.delete(msg.author.id);
                }, 500);
            };
        };

        const confPrefix = await client.Models.Prefix.findOne({
            guildID: msg.guild.id
        });
        const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
        const prefix = msg.content.match(prefixMention) ? msg.content.match(prefixMention)[0] : confPrefix ? confPrefix.prefix : client.prefix;

        if(msg.content.startsWith(prefix)) {
            const args = msg.content.slice(prefix.length).trim().split(" ");
            const cmd = args.shift().toLowerCase();
            try {
                const command = client.commands.has(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd));
                if(command) {
                    if(cooldown.has(msg.guild.id)) return;
                    if(command.premiumOnly === true && await client.Models.Premium.findOne({ guildID: msg.guild.id }) === null) return client.Errors.premiumOnly(msg.channel);
                    if(command.permissions && !msg.member.hasPermission(command.permissions) && msg.author.id !== client.creator.id) return client.Errors.noPerms(msg.channel, command.permissions);
                    if(command.clientPerms && !msg.guild.me.hasPermission(command.clientPerms)) return client.Errors.noClientPerms(msg.channel, command.clientPerms);
                    if(command.requiresArgs === true && args.length < 1) return client.Errors.noArgs(msg.guild, msg.channel, command.name);
                    if(command.creatorOnly && !client.creators.ids.includes(msg.author.id)) return msg.react("664138952730607640");

                    command.run(client, msg, args);
                    
                    setTimeout(function() {
                        cooldown.delete(msg.guild.id);
                    }, 3000);
                };
            } catch (err) {
                client.log(err);
                client.Errors.unknownErr(msg, err);
            };
        } else {
            const agreeSettings = await client.Models.Agree.findOne({
                guildID: msg.guild.id
            });
            if(agreeSettings !== null && agreeSettings.channelID === msg.channel.id && agreeSettings.roleID !== null && !msg.member.hasPermission("ADMINISTRATOR")) {
                if(msg.content.toLowerCase() !== "agree") return msg.delete();
                try {
                    await msg.member.addRole(agreeSettings.roleID);
                    msg.channel.send(`${client.Emojis.check} You have been verified **${msg.author.username}**${msg.author.discriminator}!`).then(m => m.delete(5000));
                    msg.delete();
                } catch(err) {
                    client.log(err);
                    return msg.channel.send(`${client.Emojis.x} I failed to verify you! Please contact the support team for this server! If you believe this is a problem with the bot please report it to the developers!`);
                };
            };

            if(msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
                msg.channel.send(new client.Embed().none(`Hey there! I am **${client.user.username}**, here to help! To get started just type \`${prefix}help\` and everything will come up!`).setFooter("This message will delete in 20 secodns")).then(m => m.delete(20000));
            };

            if (msg.content.includes(msg.mentions.users.first())) {
                let mentioned = client.afk.get(msg.mentions.users.first().id);
                if(mentioned) msg.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
            };

            const settings = await client.Models.Logs.findOne({
                guildID: msg.guild.id
            });
            if(settings !== null && settings.antiInviteChannelIDs !== null) {
                const invRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/m;
                if(settings.antiInviteChannelIDs.includes(msg.channel.id) && invRegex.test(msg.content.toLowerCase())) {
                    msg.delete("Contained an invite in anti-invite channels");
                    msg.channel.send(`${client.Emojis.x} You may not send invites in this channel **${msg.author.username}**#${msg.author.discriminator}!`).then(m => m.delete(10000));
                };
            };

            let afkcheck = client.afk.get(msg.author.id);
            if(afkcheck) return [client.afk.delete(msg.author.id), msg.channel.send(`Welcome back ${msg.author}! I have removed your afk!`).then(m => m.delete(20000))];
        };
    }
};