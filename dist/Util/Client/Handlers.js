"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
let commandFolders = fs_1.default.readdirSync(`${process.cwd()}/dist/Commands/`);
let eventFiles = fs_1.default.readdirSync(`${process.cwd()}/dist/Events/`).filter(f => f.endsWith(".js"));
class HandlerManager {
    constructor(client) {
        this.client = client;
        client.commands = new discord_js_1.Collection();
        client.aliases = new discord_js_1.Collection();
        client.events = new discord_js_1.Collection();
        client.status = {};
    }
    loadCommands(client) {
        commandFolders.forEach(folder => {
            let commands = fs_1.default.readdirSync(`${process.cwd()}/dist/Commands/${folder}`);
            commands.forEach(cmd => {
                if (!cmd.endsWith(".js"))
                    return;
                let command = require(`../../Commands/${folder}/${cmd}`);
                client.commands.set(cmd.split(".")[0], command);
                command.config.aliases.forEach(a => {
                    client.aliases.set(a, command);
                });
            });
        });
    }
    loadEvents(client) {
        eventFiles.forEach(ev => {
            if (!ev.endsWith(".js"))
                return;
            let event = require(`../../Events/${ev}`);
            client.events.set(ev, event);
            event.type == "process"
                ? process.on(event.name, (...args) => event.run(client, ...args))
                : event.type == "client"
                    ? client.on(event.name, (...args) => event.run(client, ...args))
                    : null;
        });
    }
    updateData(client) {
        setInterval(() => {
            client.tcp.ping({ address: "176.31.68.246" }, (_, data) => client.rsPing = Math.floor(data.avg));
            client.tcp.probe("176.31.68.246", 8000, (_, data) => client.status.radioServer = data);
            client.tcp.probe("176.31.68.246", 80, (_, data) => client.status.website = data);
            client.tcp.probe("176.31.68.246", 3000, (_, data) => client.status.authentication = data);
        }, 1000 * 10);
    }
}
exports.default = HandlerManager;
//# sourceMappingURL=Handlers.js.map