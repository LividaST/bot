import { black } from "chalk";

module.exports = {
    config: {
        name: "blacklist",
        aliases: [],
        category: "Developer",
        usage: "<add/remove> <user_id>",
        description: "Blacklist a user from our bot!",
        hidden: false,
        permissions: {
            developer: true
        }
    },
    run: async (client, message, args, prefix) => {
        if(!args[0] || (args[0].toLowerCase() != "remove" && args[0].toLowerCase() != "add")) 
            return message.reply(`no or incorrect option specified, please use the following format! \`${prefix}blacklist <add/remove> <user_id>\``);
        if(!args[1] || !client.users.fetch(args[1]))
            return message.reply("no or invalid user ID specified, please use the following format! \`${prefix}blacklist <add/remove> <user_id>\`");
        
        let coll = await client.db.collection("blacklisted"), blacklisted = await (await coll.find({})).toArray();

        if(args[0].toLowerCase() == "add") {
            if(blacklisted.map(x => x.id).includes(args[1]))
                return message.reply("that user is already blacklisted!");

            coll.findOneAndUpdate({discordID: args[1]}, {$set: {discordID: args[1], blacklistedby: message.author.id}}, {upsert: true});

            message.reply("that user has been blacklisted!");
        } else {
            if(!blacklisted.map(x => x.id).includes(args[1]))
                return message.reply("that user is not blacklisted!");

            coll.findOneAndDelete({discordID: args[1]});

            message.reply("that user is no longer blacklisted!");
        }
    }
}