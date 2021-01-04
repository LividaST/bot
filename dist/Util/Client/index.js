"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const minimist_1 = __importDefault(require("minimist"));
const Functions_1 = __importDefault(require("../Functions"));
const dotenv_1 = __importDefault(require("dotenv"));
const Handlers_1 = __importDefault(require("./Handlers"));
dotenv_1.default.config();
class Client extends Functions_1.default {
    constructor(options = {}) {
        super(options);
        this.config = require("../../config");
        this.loadExtra();
        this.logging();
        this.debug = options.debug;
        this.start();
    }
    logging() {
        this.info = (message) => console.log(`${chalk_1.default.bgBlue(chalk_1.default.white(" INFO "))} ${message}`);
        this.success = (message) => console.log(`${chalk_1.default.bgGreen(" SUCCESS ")} ${message}`);
        this.error = (message) => console.log(`${chalk_1.default.bgRed(" ERROR ")} ${message}`);
    }
    loadExtra() {
        this.ags = minimist_1.default(process.argv);
    }
    start() {
        this.Handlers = new Handlers_1.default(this);
        this.Handlers.loadEvents(this);
        this.Handlers.loadCommands(this);
        new Functions_1.default(this);
        this.info(`Loaded commands (${this.commands.size})`);
        this.info(`Loaded events (${this.events.size})`);
        this.login(this.ags.dev ? process.env.TOKENDEV : process.env.TOKEN)
            .then(_ => {
            this.db = require("../../index").db;
            this.Handlers.updateData(this);
        })
            .catch(e => this.error(e));
    }
}
exports.default = Client;
//# sourceMappingURL=index.js.map