module.exports = {
    config: {
        name: "ping",
        aliases: [],
        category: "Information",
        usage: "",
        description: "Get the clients ping!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: (client, message) => {
        message.channel.send({embed:{description:"Fetching ping..."}}).then(msg => {
            let latency = msg.createdTimestamp - message.createdTimestamp,    
                embed = new client.Embed()
                    .addField("**You ⇆ Discord:**", `${client.ws.ping}ms`, true)
                    .addField("**Bot ⇆ Discord:**", `${latency}ms`, true)
                    .setColor(client.ws.ping > 300 || msg.createdTimestamp - message.createdTimestamp > 500 ? "RED" : client.ws.ping > 150 || msg.createdTimestamp - message.createdTimestamp > 300 ? "ORANGE" : "GREEN");
            msg.edit(embed)
        })
    }
}