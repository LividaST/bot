import {Client, Message, ClientOptions} from "discord.js";

interface Options extends ClientOptions {
    token?: string;
    debug: boolean;
    _apiPort: number;
}
interface Command {
    config: {
        name: string;
        aliases: string[];
        category: string;
        description: string;
        usage: string
    };
    run(client: Client, message: Message, aliases: any[]): void;
}

interface Event {
    name: string;
    type: "process" | "client";
    run(client: Client, ...args: any[]): void;
}

export{Event, Command, Options};