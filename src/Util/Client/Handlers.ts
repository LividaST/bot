import { Client, Collection } from 'discord.js';
import fs from 'fs';

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
}