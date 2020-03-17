module.exports = {
    name: 'eval',
    aliases: ["ev"],
    category: 'Developer',
    description: 'Evaluate javascript code through a command',
    usage: '<code>',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: true,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        let bot = client;

        let codein = args.join(" ")
        if(!args[0]) codein = "No input given"
        msg.channel.send(`**Input:**\n\`\`\`js\n${codein}\n\`\`\``).then(async message => {
        
        let authorised = client.creators.ids
        let notoken = [
            "bot.token",
            "token",
            "client.token",
            "process.env.TOKEN"
        ]
        let nodel = ["require(\"fs\").unlink(\"/\")", "rm -rf", "rm *", "rm ."]
        if (!authorised.includes(msg.author.id)) return msg.edit(msg.content + "\n**Output** (Error) - "+msg.author.tag+"\n```Output could not be sent, you do not have the correct permissions!```");
        if (nodel.includes(codein)) return msg.edit(msg.content + "\n**Output** (Error)\n```You are not permitted to delete any files using evaluation!```");
        if (notoken.includes(codein)) return msg.edit(msg.content + "\n**Output** (Error)\n```You are not permitted to get the bots token using evaluation!```");
        
        try {
            let coe = (eval(codein))
        let code = coe
            if (code && code.constructor && code.constructor.name == "Promise") code = await code;
            const type =
                code != null && code.constructor ? code.constructor.name : typeof code;
            if (typeof code !== "string")
                code = require("util").inspect(code, {
                    depth: 0
                });

            let output = new client.Embed()
            .setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Output (${type.replace(bot.token, "Hiding bots token xoxo").replace(process.env.TOKEN, "")})**
\`\`\`js
${code}
\`\`\`
            `)
            .setFooter("Livida • Evaluation")
            message.edit(output).catch(e => {
                fetch
                    (`https://hasteb.in/documents`, {
                        method: "POST",
                        body: code.replace(bot.token, "Hiding bots token xoxo").replace(process.env.TOKEN, "HIDING BOT TOKEN")
                    }).then(res => res.json())
                    .then(body => {
                        return message.edit(`
                        ${msg.content}
        **Output:**\n\`\`\`js\nhttps://hasteb.in/${body.key}\n\`\`\``);
                    });
            });
        } catch (e) {
            let errEmbed = new client.Embed()
                        .setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Error**
\`\`\`js
${e}
\`\`\`
            `)
            .setFooter("Livida • Evaluation")
            message.edit(errEmbed);
        }
        })
    }
  }
  