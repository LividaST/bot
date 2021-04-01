const { Client, Collection } = require('discord.js')
const mongoose = require('mongoose')
const moment = require('moment')
const Errors = require('./Errors.js')
const Embed = require('./Embed.js')
const Handlers = require('./Handlers.js')
const StatsD = require('hot-shots')
const { KSoftClient } = require('@ksoft/api')
const DBL = require('dblapi.js')
const { Shoukaku } = require('shoukaku')

const LavalinkServer = [{ name: 'lavalink', host: process.env.LAVAHOST, port: 2333, auth: process.env.LAVAPASS }]
const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 }

module.exports = class Bot extends Client {
  constructor (options = {}) {
    super(options)
    this.bugReportsChannelID = '719760089342410772'
    this.commands = new Collection()
    this.aliases = new Collection()
    this.prefix = process.env.PREFIX
    this.creators = {
      tags: ['MegaJoshy#0001'],
      ids: ['264617372227338241']
    }
    this.Embed = Embed
    this.Errors = new Errors(this)
    this.Models = require('./Constants/Models')
    this.Emojis = require('./Constants/Emojis')
    this.fetch = require('node-fetch')
    this.stats = new StatsD('localhost', 8125)
    this.ksoft = new KSoftClient(process.env.KSOFTTOKEN)
    this.dbl = new DBL(process.env.TOPGG, this)
    this.shoukaku = new Shoukaku(this, LavalinkServer, ShoukakuOptions)
    this.nowplaying = require('./nowplaying.js')
  };

  log (msg) {
    return console.log(`[LOG • ${moment().format('HH:mm')}]: ${msg}`)
  };

  capitalise (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  };

  getUser (queryy) {
    const query = queryy.toString()
    const target = this.users.cache.get(query) || this.users.cache.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).first() || this.users.cache.filter(u => u.tag.toLowerCase().includes(query.toLowerCase())).first()
    return target
  };

  getGuild (msg, query) {
    const target = this.guilds.cache.get(query) || this.guilds.cache.filter(u => u.name.toLowerCase().includes(query.toLowerCase())).first() || this.guilds.cache.filter(u => u.id.toLowerCase().includes(query.toLowerCase())).first()
    return target
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

  getMember (queryy, msg) {
    const query = queryy.toString()
    let target
    target = msg.guild.members.cache.get(query) || msg.mentions.members.first() || msg.member
    if (query.length > 3) {
      target = msg.guild.members.cache.filter(m => m.displayName.toLowerCase().includes(query.toLowerCase())).first() || msg.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(query.toLowerCase())).first() || msg.guild.members.cache.filter(m => m.user.tag.toLowerCase().includes(query.toLowerCase())).first() || msg.guild.members.cache.get(query) || msg.mentions.members.first() || msg.member
    }
    return target
  };

  addCommand (options) {
    new Handlers.addCommand(this, options)
  }

  debugLog (i) {
    console.log(chalk.yellow('[DEBUG] ') + i)
  }

  formatString (str) {
    return str
      .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
      .replace(/^[^ ]/g, match => (match.toUpperCase()))
  }

  start () {
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    new Handlers.loadCommands(this)
    new Handlers.loadEvents(this)
    this._setupShoukakuEvents()
    this.login(process.env.TOKEN)
  }

  pause (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async playRadio (guildID, voiceChannelID) {
    const node = this.shoukaku.getNode()
    const result = await node.rest.resolve('https://stream.livida.net')
    const { tracks } = result
    const track = tracks.shift()
    const player = await node.joinVoiceChannel({
      guildID: guildID,
      voiceChannelID: voiceChannelID
    })
    player.on('error', (error) => {
      console.error(error)
      player.disconnect()
    })
    for (const event of ['end', 'closed', 'nodeDisconnect']) player.on(event, () => player.disconnect())
    player.playTrack(track)
  }

  _setupShoukakuEvents () {
    this.shoukaku.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`))
    this.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error))
    this.shoukaku.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`))
    this.shoukaku.on('disconnected', (name, reason) => console.warn(`Lavalink ${name}: Disconnected, Reason ${reason || 'No reason'}`))
  }
}
