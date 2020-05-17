const { Client, Collection } = require('discord.js')
    , mongoose = require('mongoose')
    , moment = require('moment')
    , Errors = require('./Errors.js')
    , Embed = require('./Embed.js')
    , Handlers = require('./Handlers.js')
    , StatsD = require('hot-shots');

module.exports = class Bot extends Client {
  constructor (options = {}) {
    super(options)
    this.nodes = [
      { host: process.env.LAVAHOST, port: "2333", password: process.env.LAVAPASS}
  ];
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
    this.fetch = require("node-fetch")
    this.stats = new StatsD("localhost", 8125);
  };

  log (msg) {
    return console.log(`[LOG • ${moment().format('HH:mm')}]: ${msg}`);
  };

  capitalise (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  getUser (query) {
    const target = this.users.cache.get(query) || this.users.cache.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).first() || this.users.cache.filter(u => u.tag.toLowerCase().includes(query.toLowerCase())).first()
    return target;
  };

  getGuild (msg, query) {
    const target = this.guilds.cache.get(query) || this.guilds.cache.filter(u => u.name.toLowerCase().includes(query.toLowerCase())).first() || this.guilds.cache.filter(u => u.id.toLowerCase().includes(query.toLowerCase())).first()
    return target;
  };

  getChannel (msg, query) {
    let target
    if (query.length > 3) {
      target = msg.mentions.channels.first() || this.channels.cache.get(query) || this.channels.cache.filter(ch => ch.name.includes(query.toLowerCase()) && ch.type === 'text').first()
    } else {
      target = msg.mentions.channels.first() || this.channels.cache.get(query)
    }
    return target
  };

  getMember (query, msg) {
    let target
      target = msg.guild.members.cache.get(query) || msg.mentions.members.first() || msg.member
      if (query.length > 3) {
        target = msg.guild.members.filter(m => m.displayName.toLowerCase().includes(query.toLowerCase())).first() || msg.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(query.toLowerCase())).first() || msg.guild.members.cache.filter(m => m.user.tag.toLowerCase().includes(query.toLowerCase())).first() || msg.guild.members.cache.get(query) || msg.mentions.members.first() || msg.member
      }
    return target
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