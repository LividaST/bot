import {Client, MessageEmbed} from "discord.js";
import fetch from "./Fetch";
export default class Functions extends Client {
    fetch: typeof fetch;
    Embed: unknown | MessageEmbed;
    constructor(client) {
        super(client);
        this.fetch = fetch;
        this.Embed = MessageEmbed;
    }
}