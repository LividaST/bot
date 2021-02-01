module.exports = {
    config: {
        name: "commands",
        aliases: ["help", "cmds"],
        category: "Information",
        usage: "[Category|Command]",
        description: "View our bots available commands!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: (client, message, args, prefix) => {
        const modules = [...new Set(client.Constants.commandCategories.map(x => x.name))], mAliases = [].concat.apply([], client.Constants.commandCategories.map(x => x.aliases));
        if (client.devs.includes(message.author.id)) modules.push("Developer");
        if (!args[0]) {
            const embed = new client.Embed()
                .setAuthor(`${client.user.username} • Command Categories`, client.user.avatarURL)
                .setDescription("Run `l!help [category|command]` for more information!")
                .setFooter(`${client.commands.size} total commands - <required> [optional]`);
            modules.forEach(module => 
                embed.addField(`${client.moduleEmoji[module as any]} **${module}**`, `${client.commands.filter(cmd => cmd.config.category == module).filter(x => modules.includes("Developer") ? x == x : x.config.category !== "Developer").size} Commands`, true)
            );
            message.channel.send(embed);
        } else if (modules.map(x => (x as any).toLowerCase()).includes(args[0].toLowerCase()) && client.commands.get(args[0].toLowerCase())) {
            let embed = new client.Embed().setDescription(`Both a command and category is named \`${args[0]}\`, which are you trying to view?\n\n:one: Command • :two: Category`);
            message.channel.send(embed).then(msg => {
                    msg.react(client.Constants.Emojis.Numbers.One).then(() => {
                    msg.react(client.Constants.Emojis.Numbers.Two);
                    const cmd = (reaction, user) => reaction.emoji.name == client.Constants.Emojis.Numbers.One && user.id === message.author.id,
                        cat = (reaction, user) => reaction.emoji.name == client.Constants.Emojis.Numbers.Two && user.id === message.author.id,
                        command = msg.createReactionCollector(cmd, { time: 1000000 }), category = msg.createReactionCollector(cat, { time: 1000000 });
                    command.on("collect", () => commandEmbed(client, message, args, client.getCommand(args[0]), msg));
                    category.on("collect", () => categoryEmbed(client, message, args, client.commands.filter(cmd => cmd.config.category.toLowerCase() === args[0].toLowerCase()), args[0], msg));
                });
            });
        } else if (mAliases.includes(args[0].toLowerCase()) && client.aliases.get(args[0].toLowerCase())) {
        let embed = new client.Embed().setDescription(`Both a command and category have an alias called \`${args[0]}\`, which are you trying to view?\n\n:one: Command • :two: Category`);
        message.channel.send(embed).then(msg => {
            msg.react(client.Constants.Emojis.Numbers.One).then(() => {
            msg.react(client.Constants.Emojis.Numbers.Two);
            const cmd = (reaction, user) => reaction.emoji.name == client.Constants.Emojis.Numbers.One && user.id === message.author.id,
                cat = (reaction, user) => reaction.emoji.name == client.Constants.Emojis.Numbers.Two && user.id === message.author.id,
                command = msg.createReactionCollector(cmd, { time: 1000000 }), category = msg.createReactionCollector(cat, { time: 1000000 });
            command.on("collect", () => commandEmbed(client, message, args, client.getCommand(args[0]), msg, prefix));
            category.on("collect", () => categoryEmbed(client, message, args, client.commands.filter(cmd => cmd.config.category.toLowerCase() == client.Constants.commandCategories.filter(m => m.aliases.includes(args[0].toLowerCase()))[0].name.toLowerCase()), client.Constants.commandCategories.filter(m => m.aliases.includes(args[0].toLowerCase()))[0].name, msg));
            });
        });
        } else if (modules.map(x => (x as any).toLowerCase()).includes(args[0].toLowerCase())) {
            let commands = client.commands.filter(cmd => cmd.config.category.toLowerCase() === args[0].toLowerCase());
            categoryEmbed(client, message, args, commands, args[0]);
        } else if (mAliases.includes(args[0].toLowerCase())) {
            var cat = client.Constants.commandCategories.filter(m => m.aliases.includes(args[0].toLowerCase()))[0].name;
            let commands = client.commands.filter(cmd => cmd.config.category.toLowerCase() == cat.toLowerCase());
            categoryEmbed(client, message, args, commands, cat);
        } else {
            var command = client.getCommand(args[0]);
            if (!command) return message.channel.send({embed:{description: "The specified command or category was not found!"}});
            commandEmbed(client, message, args, command, 0, prefix);
        }
    }
};
function commandEmbed(client, message, _, command, msg?, prefix?) {
    const embed = new client.Embed()
        .setAuthor(`${client.upperOne(command.config.name)}`)
        .setDescription(`\`\`\`yaml\n${command.config.description}\`\`\``)
        .addField("Category", command.config.category, true)
        .addField("Aliases", command.config.aliases[0] ? command.config.aliases.map(x => `\`${x}\``).join(", ") : "None", true)
    if(command.config.usage.length > 2) embed.setFooter(`${prefix}${command.config.name} ${command.config.usage}`);
    msg ? (() => {
            msg.edit(embed);
            msg.reactions.removeAll();
        })() : message.channel.send(embed);
}

function categoryEmbed(client, message, _, commands, category?, msg?) {
    const embed = new client.Embed()
        .setAuthor(client.upperOne(category), client.user.avatarURL())
        .setDescription(commands.map(cmd => `\`${cmd.config.name}\``).join(", "))
        .setFooter(`${commands.size} total commands in this category!`);
    msg ? (() => {
            msg.edit(embed);
            msg.reactions.removeAll();
        })() : message.channel.send(embed);
}
