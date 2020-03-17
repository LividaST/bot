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
  channelUpdates: { 
    enabled: {
      type: Boolean,
      default: false
    },
    channel: {
      type: String,
      default: "Not Set"
    }
  },
  memberUpdates: { 
    enabled: {
      type: Boolean,
      default: false
    },
    channel: {
      type: String,
      default: "Not Set"
    }
  },
  messageUpdates: { 
    enabled: {
      type: Boolean,
      default: false
    },
    channel: {
      type: String,
      default: "Not Set"
    }
  },
  emojiUpdates: { 
    enabled: {
      type: Boolean,
      default: false
    },
    channel: {
      type: String,
      default: "Not Set"
    }
  },
  

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
