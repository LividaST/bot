require('dotenv').config()
const Bot = require('./Structures/Client')
const client = new Bot({
  disableEveryone: false,
  sync: true
})
const Sentry = require('@sentry/node')
Sentry.init({
  dsn: process.env.DSN,
  release: 'discord-bot@' + '2.1.0'
})
client.start()
module.exports = client

// client.on('voiceStateUpdate', async (oldMember, newMember) => {
//   const stream = "https://radio.risefm.net/radio/8000/radio.mp3"
//   , newUserChannel = client.channels.cache.get(newMember.channelID)
//   , oldUserChannel = client.channels.cache.get(oldMember.channelID)
//   , { RadioBindings } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
//   , data = await RadioBindings.find({guildID: (newMember.channelID ? client.channels.cache.get(newMember.channelID).guild.id : client.channels.cache.get(oldMember.channelID).guild.id)});
//   if((newMember.channelID == data[0].channelID && data[0].binded) || newMember.channelID == "700486716968009800") {
//    if(newUserChannel.members.size > 2)  return;
//       const player = client.music.players.spawn({
//         guild: msg.guild,
//         voiceChannel: newUserChannel,
//         textChannel: msg.channel
//        });
//        {
//       player.queue.add('https://radio.risefm.net/radio/8000/radio.mp3')
//       if (!player.playing) player.play();
//     }
//       } else if(oldUserChannel && oldMember.channelID == data[0].channelID){
//         if(oldUserChannel.members.size < 2) {
//           if(oldUserChannel.members.map(x => x.id).includes(client.user.id)) {
//             oldUserChannel.leave();
//           }
//         }
//       }
// })
