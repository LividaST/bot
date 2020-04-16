const  { client } = require(`${process.cwd()}/src/bot.js`);

client.on('voiceStateUpdate', (oldMember, newMember) => {

  if(client.ags.dev === "true") return;
    try {
      // bounce code is MY CODE
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
    } catch (e) {
      client.debugLog(e)
    }
    })