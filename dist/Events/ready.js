"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../Util/API"));
module.exports = {
    name: "ready",
    type: "client",
    run: (client) => {
        new API_1.default().loadAPI(client);
        client.success(`Connected as ${client.user.tag}`);
        setInterval(() => {
            if (!client.maxPing || client.maxPing < client.ws.ping)
                client.maxPing = client.ws.ping;
            if (!client.minPing || client.minPing > client.ws.ping)
                client.minPing = client.ws.ping;
        }, 2000);
    }
};
//# sourceMappingURL=ready.js.map