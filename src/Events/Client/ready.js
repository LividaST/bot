const { ErelaClient, Utils } = require('erela.js');

module.exports = {
  name: 'ready',
  run: async (client) => {
    client.user.setActivity(`${client.guilds.cache.size} guilds • ${process.env.PREFIX}help`, {type: "WATCHING"})
    client.log(`${client.user.tag} is online with ${client.guilds.cache.size} guilds logged!`)
    require(`${process.cwd()}/src/server.js`);
    require(`${process.cwd()}/src/Structures/Logging.js`);
  }
}
