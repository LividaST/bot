module.exports = {
    name: "message",
    type: "client",
    run: async (client, msg) => {
        let coll = await client.db.collection("blacklisted"), blacklisted = await (await coll.find({})).toArray();
        if(blacklisted.map(x => x.discordID).includes(msg.author.id)) return;

        if(msg.channel.type == "dm") return;
        let prefixes = client.config.prefixes, exec = false;
        prefixes.forEach(async inp => {
            if(exec) return;
            let prefix = msg.content.match(new RegExp(`^<@!?${client.user.id}> `))
                ? msg.content.match(new RegExp(`^<@!?${client.user.id}> `))[0]
                : msg.content.toLowerCase().startsWith(inp.toLowerCase()) 
                ? inp : null;

            if(!prefix) return;
            exec = true;

            let args = msg.content.replace(prefix, "").split(" ").slice(1),
                input = msg.content.replace(prefix, "").split(" ")[0].toLowerCase(),
                cmd = client.commands.get(input) || client.aliases.get(input),
                member = client.guilds.cache.get(client.config.main_guild).member(msg.author.id);

            if(!cmd || (cmd.config.permissions.developer && (!member || !msg.member._roles.includes(client.config.roles.developer)))) return;

            try {
                msg.meperms = (perm) => msg.channel.send(`⚠ Lack of permissions ${msg.author}! I am missing **${perm}**.`);
                msg.perms = (perm) => msg.channel.send(`⚠ Lack of permissions ${msg.author}! You are missing **${perm}**.`);

                await cmd.run(client, msg, args, prefix);
            } catch(e) {
                console.log(e)
                msg.reply("an error occured while executing that command! Our development team have been notified.");
                client.channels.cache.get(client.config.channels.errors).send({embed: {
                    description: `${msg.author} | ${cmd.config.name}\n\n${e}`
                }})
            }
        })
    }
}