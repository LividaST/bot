const { RichEmbed } = require("discord.js");

module.exports = {
    name: "website",
    aliases: [],
    category: "Core",
    description: "Shows the website",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        const embed = new RichEmbed()
        .setTitle("Website")
        .setColor(msg.guild.me.highestRole.color || "BLUE")
        .setDescription("If you would like to go to the website you can do that [here](https://livida.net)")
        msg.channel.send(embed)
    }
};