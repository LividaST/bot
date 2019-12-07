const Embed = require('../assets/embed.js');

module.exports.run = async (client, message, args) => {
  message.channel.send(new Embed.Default('Livida Website', 'The Official Livida Website can be found at https://livida.net'));
};