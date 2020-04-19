require('dotenv').config()
const Bot = require('./Structures/Client')
const client = new Bot({
  disableEveryone: false,
  sync: true
})
const Sentry = require('@sentry/node')
Sentry.init({ 
  dsn: process.env.DSN,
  release: 'discord-bot@' + process.env.npm_package_version
});
client.start();
module.exports = client



client.on('voiceStateUpdate', async (oldMember, newMember) => {
  const stream = "http://radio.livida.net/radio/8000/radio.mp3"
  , channel = newMember.channel.id
  , newUserChannel = newMember.channel
  , oldUserChannel = oldMember.channel
  , { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
  , data = await Logs.find({guildID: channel.guild.id})[0];
  if((newMember.voice.channel.id === data.channelID && data.binded) || channel === "700486716968009800") {
   if(newUserChannel.members.size > 2)  return;
      newUserChannel.join().then(connection => {
      connection.playStream(stream,  {bitrate: 96000, volume: 0.1});
    })      
      } else if(oldUserChannel && oldUserChannel.id === channel){
        if(oldUserChannel.members.size < 2) {
          if(oldUserChannel.members.map(x => x.id).includes(client.user.id)) {
            oldUserChannel.leave();
          }
        }
      }
})