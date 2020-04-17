const { Client, Collection } = require('discord.js')
    , mongoose = require('mongoose')
    , moment = require('moment')
    , Errors = require('./Errors.js')
    , Embed = require('./Embed.js')
    , Handlers = require('./Handlers.js')

module.exports = class Bot extends Client {
  constructor (options = {}) {
    super(options)
    this.bugReportsChannelID = '688496042903207951'
    this.commands = new Collection()
    this.aliases = new Collection()
    this.prefix = process.env.PREFIX
    this.creators = {
      tags: ["Callum#6052", "MegaJoshy#0001"],
      ids: ["506899274748133376", "264617372227338241"]
    }
    this.Embed = Embed
    this.Errors = new Errors(this)
    this.Models = require('./Constants/Models')
    this.Emojis = require('./Constants/Emojis')
    this.fetch = require("node-fetch");
  };

  log (msg) {
    return console.log(`[LOG • ${moment().format('HH:mm')}]: ${msg}`);
  };

  capitalise (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  getUser (query) {
    const target = this.users.cache.get(query) || this.users.cache.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).first() || this.users.filter(u => u.tag.toLowerCase().includes(query.toLowerCase())).first()
    return target;
  };


  addCommand(options) {
    new Handlers.addCommand(this, options);
  }
  
  debugLog(i) {
    console.log(chalk.yellow("[DEBUG] ") + i)
  }

  start() {
    mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true});
    new Handlers.loadCommands(this);
    new Handlers.loadEvents(this);
    this.login(process.env.TOKEN);
  }
};