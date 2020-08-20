const { ErelaClient } = require('erela.js')
module.exports = {
  name: 'ready',
  run: async (client) => {
    client.music = new ErelaClient(client, client.nodes)
      .on('nodeError', console.error)
      .on('nodeConnect', () => client.log('Successfully created a new Node'))
      .on('queueEnd', player => {
        player.textChannel.send(new client.Embed().success('The queue has ended!'))
        return client.music.players.destroy(player.guild.id)
      })
      .on('trackStart', ({ textChannel }, { title, isStream, author }) => {
        if (isStream && (author === 'Livida')) {
          title = 'Livida Radio'
        }
        textChannel.send(new client.Embed().success(`Started playing **${title}**!`))
      })
    client.levels = new Map()
      .set('none', 0.0)
      .set('low', 0.10)
      .set('medium', 0.15)
      .set('high', 0.25)
    client.log(`${client.user.tag} is online with ${client.guilds.cache.size} guilds logged!`)
    require(`${process.cwd()}/src/server.js`)
  }
}
