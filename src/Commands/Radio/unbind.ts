module.exports = {
    config: {
        name: "unbind",
        aliases: [],
        category: "Radio",
        usage: "",
        description: "Unbind Livida radio!",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: async (client, message, args) => {
        let coll = client.db.collection("bindings"),
            binded = await coll.findOne({guildID: message.guild.id});

        if(!binded) return message.reply("Livida is not bound to any channel.")

        coll.findOneAndUpdate({guildID: message.guild.id}, {$set: {bound: false}}, {upsert: true});

        message.reply("Livida is no longer bound to a channel.")
    }
}