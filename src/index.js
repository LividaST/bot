require('dotenv').config();
const Bot = require('./Structures/Client');
const client = new Bot({
	disableEveryone: false,
	sync: true,
});
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://25416379e40f4312ad4a5b56e8a72edb@sentry.io/2648219' });

client.connectToDB();
client.loadEvents();
client.loadCommands();
client.login(Bot.token).catch(err => client.log(err));
client.on("error", err => client.log(err));

module.exports = client;