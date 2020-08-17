const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
  guildID: String,
  prefix: String
})

const UserProfile = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: {
    type: String
  },
  developer: {
    type: Boolean,
    default: false
  },
  staff: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  birthday: {
    type: Date
  },
  level: {
    type: Number,
    default: '0'
  },
  xp: {
    type: Number,
    default: '0'
  }
})

module.exports = {
  Prefix: mongoose.model('Prefix', prefixSchema),
  UserProfile: mongoose.model('UserProfile', UserProfile)
}
