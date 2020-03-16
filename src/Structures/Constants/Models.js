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
  guildChangeLogsChannel: { type: String, default: "Not Set"},
  messageLogsChannel: { type: String, default: "Not Set"},

  // Ignored
  ignoredRoles: { type: String, default: []},
  ignoreChannels: { type: String, default: []},
  ignoredUsers: { type: String, default: []},

  // Guild change Logs
  // Members
  guildMemberUpdateLogs: { type: String, default: {enabled: false}},
  guildMemberSoftBanLogs: { type: String, default: {enabled: false}},
  guildMemberBanLogs: { type: String, default: {enabled: false}},
  guildMemberKickLogs: { type: String, default: {enabled: false}},
  guildMemberWarnLogs: { type: String, default: {enabled: false}},
  // Channels
  guildChannelCreateLogs: { type: String, default: {enabled: false}},
  guildChannelUpdateLogs: { type: String, default: {enabled: false}},
  guildChannelDeleteLogs: { type: String, default: {enabled: false}},
  // Emojis
  guildEmojiCreateLogs: { type: String, default: {enabled: false}},
  guildEmojiUpdateLogs: { type: String, default: {enabled: false}},
  guildEmojiDeleteLogs: { type: String, default: {enabled: false}},
  // Webhook Logs
  guildWebhookCreateLogs: { type: String, default: {enabled: false}},
  guildWebhookUpdateLogs: { type: String, default: {enabled: false}},
  guildWebhookDeleteLogs: { type: String, default: {enabled: false}},

  // Messages Logs
  messageUpdateLogs: { type: String, default: {enabled: false}},
  messageDeleteLogs: { type: String, default: {enabled: false}},


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
