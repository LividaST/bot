module.exports = {
    name: '',
    aliases: [],
    category: '',
    description: '',
    usage: '',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        let bot = client;

        const codein = args.join(" ")
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
            if (code.length > 1978) {
        
            }
        
            message.edit(msg.content + `\n**Output (${type.replace(bot.token, "Hiding bots token xoxo").replace(process.env.TOKEN, "")}):**\n\`\`\`js\n${code}\n\`\`\``).catch(e => {
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
            message.edit(`${msg.content}\n***Error:**\n\`\`\`js\n${e}\n\`\`\``);
        }
        })
    }
  }
  