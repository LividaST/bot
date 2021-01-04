"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Fetch_1 = __importDefault(require("./Fetch"));
class Functions extends discord_js_1.Client {
    constructor(client) {
        super(client);
        this.fetch = Fetch_1.default;
        this.Embed = discord_js_1.MessageEmbed;
    }
}
exports.default = Functions;
//# sourceMappingURL=index.js.map