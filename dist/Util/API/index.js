"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GET_1 = require("./Routes/GET/");
const app = express_1.default();
class API {
    constructor() { }
    loadAPI(client) {
        app.listen(client.options._apiPort, () => client.success(`API started on port ${client.options._apiPort}`));
        app.get("/devstats", (req, res) => GET_1.devstats(client, null, res));
        app.get("/serverinfo", (req, res) => GET_1.serverinfo(client, req, res));
        app.get("/serverinfo/:serverID", (req, res) => GET_1.serverinfo(client, req, res));
        app.get("*", (req, res) => res.status(404).json({ code: 404, msg: "endpoint not found" }));
        app.post("*", (req, res) => res.status(404).json({ code: 404, msg: "endpoint not found" }));
    }
}
exports.default = API;
//# sourceMappingURL=index.js.map