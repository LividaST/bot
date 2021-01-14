import {Client, MessageEmbed} from "discord.js";
import regenCanvas from "./regenCanvas";
import axios from "axios";
export default class Functions extends Client {
    Embed: unknown | MessageEmbed;
    constructor(client) {
        super(client);
        this.Embed = MessageEmbed;
        client.fetch = (url: string, options?: object) => axios(url, options).catch(e => console.log(`${client.chalk.orange(` AXIOS `)} ${e}`));

        setInterval(() => regenCanvas(client).catch(null), 5000)
    }
    

    
    getChannel(msg, query) {
        if (query.length > 3) return msg.mentions.channels.first() || this.channels.cache.get(query) || this.channels.cache.filter(ch => (ch as any).name.includes(query.toLowerCase()) && ch.type === 'text').first()
        else return msg.mentions.channels.first() || this.channels.cache.get(query)
    };

    getCommand(cmd) {
        const client = require(process.cwd() + "/dist/index").Bot;
        const cm = client.aliases.get(cmd.toLowerCase()) || client.commands.get(cmd.toLowerCase());
        return cm || false;
    };

    upperOne(input: string) {
        return input.toLowerCase().charAt(0).toUpperCase() + input.substring(1);
    };

    requestSong(song: string, user: string) {
        const body = JSON.stringify({
            name: user,
            type: 'Song Request',
            message: song,
            requestOrigin: 'Discord'
        });
        
        (axios as any)('https://livida.net/api/radio/request', {
            method: "POST",
            data: body,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}