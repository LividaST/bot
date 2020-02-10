module.exports = {
    name: "join",
    aliases: ["summon"],
    category: "Music",
    description: "Make the bot join your voice channel",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        const { voiceChannel } = msg.member;
        if(!voiceChannel) return msg.channel.send(new client.Embed().error(`You need to be in a voice channel to use that command!`));
        await voiceChannel.join();
        msg.channel.send(new client.Embed().success(`I have successfully joined **${voiceChannel.name}**!`))
    }
};