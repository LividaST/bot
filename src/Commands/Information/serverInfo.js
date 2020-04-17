module.exports = {
    name: 'serverInfo',
    aliases: ["si"],
    category: 'Information',
    description: 'View a servers information',
    usage: '<guild_id>',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        const guild = client.getGuild(msg, args[0]);

        let embed = new client.Embed()
            .setAuthor(`${guild.name} • Information`, guild.iconURL())
            .addField(`Guild`, `${guild.name} • ${guild.id}`)
            .addField(`Owner`, `${guild.owner.user.username} • ${guild.owner.user.id}`, true)
            .addField(`Region`, `${guild.region}`)
            .setThumbnail(guild.iconURL())
            .setFooter("Livida • Information");
            if(guild.premiumSubscriptionCount > 0) embed.addField(`Boost Information`, `Boost Count: **${guild.premiumSubscriptionCount}**, Boost Level: **${guild.premiumTier}**`)
            if(guild.afkChannelID) embed.addField(`AFK Voice Channel`, `${client.getChannel(guild.afkChannelID).name} • Timeout: **${guild.afkTimeout} Seconds**`)
    }
  }
  