module.exports = {
    config: {
        name: "timetable",
        aliases: ["upcoming", "next", "tt"],
        category: "Radio",
        usage: "",
        description: "View upcoming presenters!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: (client, message) => {
        message.channel.send(client.ttCanvas);
    }
}