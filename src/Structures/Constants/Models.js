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
  // Guild ID
  guildID: String,

  // Log Channels
  guildChangeLogsChannel: String,
  messageLogsChannel: String,

  // Ignored
  ignoredRoles: Array,
  ignoreChannels: Array,
  ignoredUsers: Array,

  // Guild change Logs
  // Members
  guildMemberUpdateLogs: String,
  guildMemberSoftBanLogs: String,
  guildMemberBanLogs: String,
  guildMemberKickLogs: String,
  guildMemberWarnLogs: String,
  // Channels
  guildChannelCreateLogs: String,
  guildChannelUpdateLogs: String,
  guildChannelDeleteLogs: String,
  // Emojis
  guildEmojiCreateLogs: String,
  guildEmojiUpdateLogs: String,
  guildEmojiDeleteLogs: String,
  // Webhook Logs
  guildWebhookCreateLogs: String,
  guildWebhookUpdateLogs: String,
  guildWebhookDeleteLogs: String,

  // Messages Logs
  messageUpdateLogs: String,
  messageDeleteLogs: String,


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
