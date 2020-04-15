module.exports = {
    name: 'ping',
    aliases: ["uptime"],
    category: 'Information',
    description: 'Get current ping between the bot and discord and also get the bots uptime.',
    usage: '',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        msg.channel.send({embed: {
            description: "Loading..."
        }}).then(message => {
            function uptime() {
                let totalSeconds = process.uptime();
                let realTotalSecs = Math.floor(totalSeconds % 60);
                let days = Math.floor((totalSeconds % 31536000) / 86400);
                let hours = Math.floor((totalSeconds / 3600) % 24);
                let mins = Math.floor((totalSeconds / 60) % 60);
                
                return `Days: ${days} • Hours: ${hours} • Minutes: ${mins} • Seconds: ${realTotalSecs}`;
            }
            let color = "GREEN";
            if(client.ws.pings > 150) {color = "ORANGE"};
            if(client.ws.pings > 250) {color = "RED"};
            setTimeout(() => {
                let embed = new client.Embed()
                .setAuthor("Livida • Ping & Uptime")
                .setDescription(`
**Bot Ping:** ${client.ws.ping}ms
**API Latency:** ${message.createdTimestamp - msg.createdTimestamp}

**Bot Uptime**
\`\`\`${uptime()}\`\`\`
                `)
				.setColor(color)
				.setFooter("Livida • Information");
				message.edit(embed);
			}, 1000);
        });
    }
  };
  