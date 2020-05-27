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
