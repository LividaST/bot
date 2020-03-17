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
                
                return `Days: ${days} • Hours: ${hours} • Minutes: ${mins} • Seconds: ${realTotalSecs}` ;
            }
            let color = "GREEN";
            if(client.pings[0] > 200) {color = "RED"} else if(client.pings[0] > 100) {color = "ORANGE"};
            setTimeout(() => {
                let embed = new client.Embed()
                    .setDescription(`
                    **Bot Ping**
                    ${client.pings[0]}ms
                    **API Latency**
                    ${msg.createdTimestamp - message.createdTimestamp}

                    **Bot Uptime**
                    \`\`\`
${uptime()}
                    \`\`\`
                    `)
					.setColor(color)
					.setFooter("Livida • Information");
				message.edit(embed);
			}, 1000);
        });
    }
  };
  