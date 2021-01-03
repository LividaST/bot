import { Client, Collection } from "discord.js";
import fs from "fs";

let commandFolders = fs.readdirSync(`${process.cwd()}/dist/Commands/`);
let eventFiles = fs.readdirSync(`${process.cwd()}/dist/Events/`).filter(f => f.endsWith(".js"));

export default class HandlerManager {
    client: Client;
    constructor(client) {
        this.client = client;
        client.commands = new Collection();
        client.aliases = new Collection();
        client.events = new Collection();
        client.status = {};
    }

    loadCommands(client) {
        commandFolders.forEach(folder => {
            let commands = fs.readdirSync(`${process.cwd()}/dist/Commands/${folder}`);
            commands.forEach(cmd => {
                if(!cmd.endsWith(".js")) return;
                let command = require(`../../Commands/${folder}/${cmd}`);
                client.commands.set(cmd.split(".")[0], command)
                command.config.aliases.forEach(a => {
                    client.aliases.set(a, command)
                })
            })
        })
    }

    loadEvents(client) {
        eventFiles.forEach(ev => {
            if(!ev.endsWith(".js")) return; 
            let event = require(`../../Events/${ev}`);
            client.events.set(ev, event);
            event.type == "process" 
                ? process.on(event.name, (...args) => event.run(client, ...args))
                : event.type == "client"
                ? client.on(event.name, (...args) => event.run(client, ...args))
                : null;
        })
    }

    updateData(client) {
        setInterval(() => {
            client.tcp.ping({address:"176.31.68.246"}, (_, data) => client.rsPing = Math.floor(data.avg));
            client.tcp.probe("176.31.68.246", 8000,  (_, data) => client.status.radioServer = data);
            client.tcp.probe("176.31.68.246", 80, (_, data) => client.status.website = data);
            client.tcp.probe("176.31.68.246", 3000, (_, data) => client.status.authentication = data);
        }, 1000 * 10);
    }
}