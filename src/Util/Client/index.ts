import {Collection, MessageEmbed} from "discord.js";
import {Db} from "mongodb";
import chalk from "chalk";
import minimist, { ParsedArgs } from "minimist";
import Functions from "../Functions"
import env from "dotenv";
import Handlers from "./Handlers";

env.config();

export default class Client extends Functions {
    debug: boolean;
    config: object;
    devs: string[];
    moduleEmoji: object;
    commandCategories: object[];
    Constants: any;

    info?(message: any): void; 
    success?(message: any): void; 
    error?(message: any): void;

    events: Collection<any, any>;
    commands: Collection<any, any>;
    aliases: Collection<any, any>;
    Handlers: Handlers;
    ags: ParsedArgs;
    db: Db;
    
    constructor(options: any = {}) {
        super(options);
        this.config = require("../../config");

        this.devs = ["506899274748133376", "264617372227338241"]

        this.commandCategories = require("../Constants/Categories").filter(x => !x.hidden).map(x => x.name);
        this.Constants = {Emojis: require("../Constants/Emojis"), commandCategories: require("../Constants/Categories")};
        this.moduleEmoji = this.Constants.Emojis.categories;


        this.loadExtra();
        this.logging();

        this.debug = options.debug;

        this.start();
    }

    logging() {
        this.info = (message: String) => console.log(`${chalk.bgBlue(chalk.white(" INFO "))} ${message}`);
        this.success = (message: String) => console.log(`${chalk.bgGreen(" SUCCESS ")} ${message}`);
        this.error = (message: String)  => console.log(`${chalk.bgRed(" ERROR ")} ${message}`);
    }

    loadExtra() {
        this.ags = minimist(process.argv);
    }

    start() {
        this.Handlers = new Handlers(this);
        this.Handlers.loadEvents(this);
        this.Handlers.loadCommands(this);

        new Functions(this);

        this.info(`Loaded commands (${this.commands.size})`);
        this.info(`Loaded events (${this.events.size})`);

        this.login(this.ags.dev ? process.env.TOKENDEV : process.env.TOKEN)
            .then(_ => this.db = require("../../index").db)
            .catch(this.error);
    }
}