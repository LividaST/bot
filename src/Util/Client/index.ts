import axios from 'axios';
import { Client, Collection, MessageEmbed } from 'discord.js';
import { connect } from 'mongodb';

import * as Constants from '../Constants';
import * as Interfaces from '../interfaces';
import * as Methods from '../Methods';
import Handlers from './Handlers';

export class Livida extends Client {
    readonly logger = Methods.createLogger();
    readonly config = require("../../config");
    readonly chalk = require("chalk");
    readonly devs = ["506899274748133376"];

    fetch = (url: string, options?: object) => axios(url, options).catch(e => console.log(`${this.chalk.bgMagenta(` AXIOS `)} ${e}`));

    info = this.logger.info;
    debug = this.logger.debug;
    error = this.logger.error;
    success = this.logger.success;

    db: any;
    database: any;
    Constants = {} as any;
    music = new Collection<string, object>();
    moduleEmoji: any;

    Handlers = new Handlers(this);

    commands = new Collection<string, Interfaces.Command>();
    aliases = new Collection<string, Interfaces.Command>();
    events = new Collection<string, Interfaces.Event>();

    Embed = MessageEmbed;
    
    constructor(options?: Partial<Interfaces.Options>) { super(options); }

    async initDatabase() {
        this.debug("Database... connecting");
		let db = await connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
        })
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(1);
		this.success("Database... connected");
        return db;
    }

    async loadExtra() {
        Object.keys(Methods).forEach(key => 
            this[key] = Methods[key]
        );

        Object.keys(Constants).forEach(key => 
            this.Constants[key] = Constants[key]
        );

        this.moduleEmoji = this.Constants.Emojis.categories;

        return true;
    }

    async login(token = process.env.TOKEN) {
        this.db = (await this.initDatabase()).db("botdev");
        await this.loadExtra();

        this.Handlers.loadEvents(this);
        this.Handlers.loadCommands(this);


        this.info(`Loaded commands (${this.commands.size})`);
		this.info(`Loaded events (${this.events.size})`);

        super.login(token).catch(this.logger.error)

        return token as string;
    }
}