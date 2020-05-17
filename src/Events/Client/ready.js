module.exports = {
  name: 'ready',
  run: async (client) => {
    client.user.setActivity(`${client.guilds.cache.size} guilds • ${process.env.PREFIX}help`, {type: "WATCHING"})
    client.log(`${client.user.tag} is online with ${client.guilds.cache.size} guilds logged!`)
    require(`${process.cwd()}/src/server.js`);
    require(`${process.cwd()}/src/Structures/Logging.js`);
    client.music.on("nodeConnect", node => console.log("New node connected"));
    client.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    client.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
    client.music.on("queueEnd", player => {
        player.textChannel.send("Queue has ended.")
        client.music.players.destroy(player.guild.id);
    });
  }
}
