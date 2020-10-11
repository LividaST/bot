module.exports = {
  name: 'ready',
  run: async (client) => {
    client.log(`${client.user.tag} is online with ${client.guilds.cache.size} guilds logged!`)
    require(`${process.cwd()}/src/server.js`)
  }
}
