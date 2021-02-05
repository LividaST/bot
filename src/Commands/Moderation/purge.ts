module.exports = {
    config: {
        name: "purge",
        aliases: ["clear"],
        category: "Moderation",
        usage: "",
        description: "Clear a specified amount of messages from a channel!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: (client, message, args) => {
        if(!message.member.permissions.toArray().includes("MANAGE_MESSAGES")) return message.perms("Manage Messages");
        if(!message.guild.me.permissions.toArray().includes("MANAGE_MESSAGES")) return message.meperms("Manage Messages");
        if(isNaN(args[0])) return message.reply("please provide a valid number of messages to delete!");
        if(args[0] > 100) return message.reply("please choose a number between 1 and 100!");
        message.channel.bulkDelete(args[0], true)
            .then(deleted => {
                let count = deleted.map(x => x).length;
                message.channel.send(new client.Embed().setColor("GREEN").setDescription(`${message.author} successfully cleared **${count}** messages from the channel!${args[0] > count ?  `\n**${args[0] - count}** messages could not be deleted as they are older than 14 days!` : ""}`))
                    .then(msg => {
                        msg.delete({timeout: 10000}).catch(null);
                    })
            })
            .catch(null)
    }
}