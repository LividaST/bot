const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
  guildID: String,
  prefix: String
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
  textChannel: {
    type: String
  },
  binded: {
    type: Boolean,
    default: false
  }
})

module.exports = {
  RadioBindings: mongoose.model('RadioBindings', RadioBindings),
  Prefix: mongoose.model('Prefix', prefixSchema)
}
