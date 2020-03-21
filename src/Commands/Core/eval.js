module.exports = {
    name: 'eval',
    aliases: ["ev"],
    category: 'Developer',
    description: 'Evaluate javascript code through a command',
    usage: '<code>',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: true,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        let bot = client;

        let codein = args.join(" ")
        if(!args[0]) codein = "No input given"
        var inputt = new client.Embed().setFooter("Livida • Evaluation").setColor("ORANGE")
.setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Output** (Type)
\`\`\`js
Evaluating...
\`\`\`
`)
        msg.channel.send(inputt).then(async message => {
        var notoken = ["bot.token","token","client.token","process.env.TOKEN"], nodel = ["require(\"fs\").unlink(\"/\")", "rm -rf", "rm *", "rm ."];
        if (nodel.includes(codein)) return msg.edit(msg.content + "\n**Output** (Error)\n```You are not permitted to delete any files using evaluation!```");
        if (notoken.includes(codein)) return msg.edit(msg.content + "\n**Output** (Error)\n```You are not permitted to get the bots token using evaluation!```");
        
    try {
        let coe = (eval(codein)), code = coe;
        if (code && code.constructor && code.constructor.name == "Promise") code = await code;
            const type = code != null && code.constructor ? code.constructor.name : typeof code;
        if (typeof code !== "string")code = require("util").inspect(code, {depth: 0});
            var output;
        if(code.length > 1900) {
                fetch(`https://hasteb.in/documents`, {method: "POST",body: code.replace(bot.token, "Hiding bots token xoxo").replace(process.env.TOKEN, "HIDING BOT TOKEN")
                })
                .then(res => res.json())
                .then(body => {
                    output = (`https://hasteb.in/${body.key}`);
                });
            }
            var outputt = new client.Embed().setFooter("Livida • Evaluation").setColor("GREEN")
.setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Output (${type.replace(bot.token, "Hiding bots token xoxo").replace(process.env.TOKEN, "")})**
\`\`\`js
${code}
\`\`\`
`);
            message.edit(outputt).catch(e => {
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
            let errEmbed = new client.Embed().setColor("RED").setFooter("Livida • Evaluation")
.setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Error**
\`\`\`js
${e}
\`\`\`
`);
            message.edit(errEmbed);
            };
        });
    }
  };
  