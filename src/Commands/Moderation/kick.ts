module.exports = {
    config: {
        name: "kick",
        aliases: [],
        category: "Moderation",
        description: "Kick a member from the server.",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.perms("KICK_MEMBERS");
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.meperms("KICK_MEMBERS");
        if(!args[0]) return message.channel.send(new client.Embed().setDescription(`:warning: | ${message.author}, please specify a member to kick!`).setColor("ORANGE"));

        const user = message.mentions.users.first() || await client.users.fetch(args[0]) || client.getUser(args[0]);
        
        if(!user) return message.channel.send(new client.Embed().setDescription(`:warning: | ${message.author}, the specified member was not found!`));
        if(message.member != message.guild.owner && message.member.roles.highest.rawPosition <= (message.guild.members.cache.get(user.id) ? message.guild.members.cache.get(user.id).roles.highest.rawPosition : 0)) 
            return message.channel.send(new client.Embed().setDescription(`⚠ | ${message.author}, you cannot kick this member, their highest role is higher than your highest role!`).setColor("ORANGE"));
        if(message.member != message.guild.owner && message.guild.me.roles.highest.rawPosition <= (message.guild.members.cache.get(user.id) ? message.guild.members.cache.get(user.id).roles.highest.rawPosition : 0)) 
            return message.channel.send(new client.Embed().setDescription(`⚠ | ${message.author}, I cannot kick this member, their highest role is higher than my highest role!`).setColor("ORANGE"));
        
        const embed = new client.Embed()
            .setDescription(`**${message.author.tag}** has kicked **${user.tag}** from the server!${args[1] ? ` Reason: **${args.splice(1).join(" ") || "No reason specified!"}**` : ""}`)
            .setTimestamp()
            
        message.guild.members.kick(user.id).then(e => message.channel.send(embed))
        .catch(e => message.channel.send(new client.Embed().setDescription(`:warning: | ${message.author}, there was an error while attempting to kick that user!\n\n:warning: **${e}**`)));
    }
}