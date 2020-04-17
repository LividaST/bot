const { Client, Collection } = require('discord.js')
    , mongoose = require('mongoose')
    , moment = require('moment')
    , Errors = require('./Errors.js')
    , Embed = require('./Embed.js')
    , Handlers = require('./Handlers.js')

class Bot extends Client {
  constructor (options = {}) {
    super(options)
    this.bugReportsChannelID = '688496042903207951'
    this.token = process.env.TOKEN
    this.commandDir = process.env.COMMAND_DIR
    this.eventDir = process.env.EVENT_DIR
    this.commands = new Collection()
    this.aliases = new Collection()
    this.afk = new Map()
    this.prefix = process.env.PREFIX
    this.creators = {
      tags: ["Callum#6052", "MegaJoshy#0001"],
      ids: ["506899274748133376", "264617372227338241"]
    }
    this.Colours = { yellow: '#F7DC6F', orange: '#FB8C00' }
    this.Embed = Embed
    this.Errors = new Errors(this)
    this.Models = require('./Constants/Models')
    this.Emojis = require('./Constants/Emojis')
    this.fetch = require("node-fetch");
  };

  log (msg) {
    return console.log(`[LOG • ${moment().format('HH:mm')}]: ${msg}`)
  };

  capitalise (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  };

  getUser (query) {
    const target = this.users.get(query) ||
                    this.users.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).first() ||
                    this.users.filter(u => u.tag.toLowerCase().includes(query.toLowerCase())).first()
    return target
  };

  getMember (includeAuthor, query, msg) {
    let target
    if (includeAuthor === true) {
      target = msg.guild.members.get(query) ||
                    msg.mentions.members.first() ||
                    msg.member
      if (query.length > 3) {
        target = msg.guild.members.filter(m => m.displayName.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.username.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.tag.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.get(query) ||
                        msg.mentions.members.first() ||
                        msg.member
      }
    } else {
      target = msg.guild.members.get(query) ||
                    msg.mentions.members.first()
      if (query.length > 3) {
        target = msg.guild.members.get(query) ||
                        msg.guild.members.filter(m => m.displayName.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.username.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.guild.members.filter(m => m.user.tag.toLowerCase().includes(query.toLowerCase())).first() ||
                        msg.mentions.members.first()
      }
    };
    return target
  };

  getChannelTarget (msg, query) {
    let target
    if (query.length > 3) {
      target = msg.mentions.channels.first() ||
                    msg.guild.channels.get(query) ||
                    msg.guild.channels.filter(ch => ch.name.includes(query.toLowerCase()) && ch.type === 'text').first()
    } else {
      target = msg.mentions.channels.first() ||
                    msg.guild.channels.get(query)
    }
    return target
  };

  getRoleTarget (msg, query) {
    let target
    if (query.length > 3) {
      target = msg.mentions.roles.first() ||
                    msg.guild.roles.get(query) ||
                    msg.guild.roles.find(r => r.name.toLowerCase().includes(query.toLowerCase()))
    } else {
      target = msg.mentions.roles.first() ||
                    msg.guild.roles.get(query)
    };
    return target
  };

  loadCommands () {
    new Handlers.loadCommands(this);
  };

  loadEvents () {
    new Handlers.loadEvents(this);
  };
  
  addCommand(options) {
    new Handlers.addCommand(this, options);
  }
  connectToDB () {
    return mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  };

  debugLog(i) {
    console.log(chalk.yellow("[DEBUG] ") + i)
  }
}

module.exports = Bot;