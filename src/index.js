require('dotenv').config();
const Bot = require('./structures/Client.js');
const client = new Bot({
	disableEveryone: false,
	sync: true,
});

client.connectToDB();
client.loadEvents();
client.loadCommands();
client.login(Bot.token).catch(err => client.log(err));
client.on("error", err => client.log(err));

module.exports = client;