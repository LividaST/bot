const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
  guildID: String,
  prefix: String
})

const xpSchema = new mongoose.Schema({
  userID: String,
  guildID: String,
  level: Number,
  xp: Number
})

const Logs = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // Guild ID
  guildID: { type: String },

  // Log Channels
  channelUpdates: { type: String, default: {enabled: false, channel: "Not Set"}},
  memberUpdates: { type: String, default: {enabled: false, channel: "Not Set"}},
  messageUpdates: { type: String, default: {enabled: false, channel: "Not Set"}},
  emojiUpdates: { type: String, default: {enabled: false, channel: "Not Set"}},
  

})

const Premium = new mongoose.Schema({
  guildID: String,
  embedColour: String
})

module.exports = {
  Prefix: mongoose.model('Prefix', prefixSchema),
  Xp: mongoose.model('Xp', xpSchema),
  Logs: mongoose.model('Logs', Logs),
  Premium: mongoose.model('PremiumGuilds', Premium)
}
