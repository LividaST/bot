module.exports = {
    name: 'purge',
    aliases: ["prune"],
    category: 'Moderation',
    description: 'Delete a certain amount of messages from a channel.',
    usage: '<amount>',
    permissions: 'MANAGE_MESSAGES',
    clientPerms: 'MANAGE_MESSAGES',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        function err(input) {
            let embed = new client.Embed()
            .setColor("RED")
            .setDescription("An error has occured while running the command!\n```" + input + "```")
        return embed;
        }
        if(isNaN(args[0])) {
            msg.channel.send("The provided value is not a number!").then(message => {
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 5000);
            });
        } else if(Number(args[0]) > 100) {
            await msg.channel.bulkDelete(100)
            setTimeout(50)
            msg.channel.send("Successfully purged 100 messages!").then(message => {message.delete(5000)}).catch(error => message.channel.send(err(error.stack)));
        } else {
            await msg.channel.bulkDelete(args[0])
            setTimeout(50)
            msg.channel.send("Successfully purged " + args[0] + " messages!").then(message => {message.delete(5000)}).catch(error => message.channel.send(err(error.stack)));
        }
    }
  };
  