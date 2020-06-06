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
  guildID: {
    type: String
  },

  // Log Channels
  channelUpdatesEnabled: {
    type: Boolean,
    default: false
  },
  channelUpdatesChannel: {
    type: String,
    default: 'Not Set'
  },
  memberUpdatesEnabled: {
    type: Boolean,
    default: false
  },
  memberUpdatesChannel: {
    type: String,
    default: 'Not Set'
  },
  messageUpdatesEnabled: {
    type: Boolean,
    default: false
  },
  messageUpdatesChannel: {
    type: String,
    default: 'Not Set'
  },
  emojiUpdatesEnabled: {
    type: Boolean,
    default: false
  },
  emojiUpdatesChannel: {
    type: String,
    default: 'Not Set'
  }
})

const RadioBindings = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: {
    type: String
  },
  channelID: {
    type: String,
    default: ''
  },
  binded: {
    type: Boolean,
    default: false
  }
})

const UserProfile = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: String
  },
  position: {
    type: String
  },
  developer: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  birthday: {
    type: Date,
  }
})

module.exports = {
  Prefix: mongoose.model('Prefix', prefixSchema),
  Xp: mongoose.model('Xp', xpSchema),
  Logs: mongoose.model('Logs', Logs),
  RadioBindings: mongoose.model('RadioBindings', RadioBindings),
  UserProfile: mongoose.model('UserProfile', UserProfile)
}
