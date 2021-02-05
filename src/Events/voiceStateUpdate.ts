module.exports = {
    name: "voiceStateUpdate",
    type: "client",
    run: async (client, oldState, newState) => {
        let coll = client.db.collection("bindings"), binding = await coll.findOne({ guildID: newState.guild.id });

        if(!binding || !binding.bound || newState.member.bot) return;
        
        if(binding.channelID == newState.channelID)
            client.music.set(newState.guild.id, (await newState.channel.join()).play("https://stream.livida.net/"));
        
        if(binding.channelID == oldState.channelID)
            if(oldState.channel.members.filter(m => !m.user.bot).size < 1) oldState.channel.leave();
    }
}