module.exports = {
    name: "message",
    type: "client",
    run: (client, msg) => {
        if(msg.channel.type == "dm") return;
        let prefixes = client.ags.dev ? ["!!"] : ["l!", "1!"];
        prefixes.forEach(async inp => {
            let prefix = msg.content.match(new RegExp(`^<@!?${client.user.id}> `))
                ? msg.content.match(new RegExp(`^<@!?${client.user.id}> `))[0]
                : msg.content.toLowerCase().startsWith(inp.toLowerCase()) 
                ? inp : null;

            if(!prefix) return;

            let args = msg.content.replace(prefix, "").split(" ").slice(1),
                input = msg.content.replace(prefix, "").split(" ")[0].toLowerCase(),
                cmd = client.commands.get(input) || client.aliases.get(input),
                member = client.guilds.cache.get(client.config.main_guild).member(msg.author.id);

            if(!cmd || (cmd.config.permissions.developer && (!member || (!msg.member._roles.includes(client.config.roles.lead_developer) && !msg.member._roles.includes(client.config.roles.developer))))) return;

            try {
                await cmd.run(client, msg, args);
            } catch(e) {
                msg.reply("an error occured while executing that command! Our development team have been notified.");
                client.channels.cache.get(client.config.channels.errors).send({embed: {
                    description: `${msg.author} | ${cmd.config.name}\n\n${e}`
                }})
            }
        })
    }
}