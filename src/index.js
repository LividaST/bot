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



client.on('voiceStateUpdate', (oldMember, newMember) => {
    const stream = "http://radio.livida.net/radio/8000/radio.mp3"
    const channel = "700486716968009800" 
      let newUserChannel = newMember.voiceChannel
      let oldUserChannel = oldMember.voiceChannel
    
      if(newUserChannel && newUserChannel.id === channel) {
          if(newUserChannel.members.size > 2)  return;
          newUserChannel.join().then(connection => {
            connection.playStream(stream,  {bitrate: 96000, volume: 0.1});
        })
      
      } else if(oldUserChannel && oldUserChannel.id === channel){
        if(oldUserChannel.members.size < 2) {
          oldUserChannel.leave()
        }
      }
})