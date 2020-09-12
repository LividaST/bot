const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
  guildID: String,
  prefix: String
})

module.exports = {
  Prefix: mongoose.model('Prefix', prefixSchema)
}
