const { ErelaClient, Utils } = require('erela.js');

module.exports = {
  name: 'ready',
  run: async (client) => {
    const Prefix = await client.Models.Prefix
    if (client.musicEnabled === true) {
      client.music = new ErelaClient(client, client.nodes)
        .on('nodeError', console.error)
        .on('nodeConnect', () => client.log('Successfully created a new Node'))
        .on('queueEnd', player => {
          player.textChannel.send(new client.Embed().success('The queue has ended!'))
          return client.music.players.destroy(player.guild.id)
        })
        .on('trackStart', ({ textChannel }, { title, duration }) => textChannel.send(new client.Embed().success(`Started playing **${title}**! This song will play for \`${Utils.formatTime(duration, true)}\``)))
      client.levels = new Map()
        .set('none', 0.0)
        .set('low', 0.10)
        .set('medium', 0.15)
        .set('high', 0.25)
    };

    client.user.setPresence({ game: { name: `${Prefix}help | ${client.guilds.size} guilds` }, status: 'online' })
    client.log(`${client.user.tag} is online with ${client.guilds.size} guilds logged!`)

    // Start express server
    require(`${process.cwd()}/src/server.js`);
    require(`${process.cwd()}/src/Structures/Logging.js`);

    // const { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`);

    // client.guilds.forEach(guild => {
    //  const query = {guildID: guild.id};
    //  Logs.findOneAndUpdate(query, { time: new Date() }, {upsert: true, setDefaultsOnInsert:true}, function(err, doc) {
    //   if (err) return msg.channel.send(err);
    //   });
    // })
  }
}
