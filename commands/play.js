const Embed = require('../assets/embed.js');
const { error } = require('../assets/main.js');

module.exports.run = async (client, message, args) => {
  let { voiceChannel: vc } = message.member;
  if (!vc) return message.channel.send(new Embed.Error('You are not currently connected to a voice channel!'));
  if (vc.connection) return message.channel.send(new Embed.Error('I am already connected to your voice channel!'));
  if (message.guild.voiceConnection) return message.channel.send(new Embed.Error('I am already connected in another channel!'));
  try {
    let connection = await vc.join();
    connection.playArbitraryInput('https://radio.livida.net/radio/8000/radio.mp3');
    return message.channel.send(new Embed.Success('Now playing Livida Radio!'));
  } catch (e) {
    message.channel.send(new Embed.Error('An error occured: `'+e+'`'));
    return error(JSON.stringify(e));
  };
};