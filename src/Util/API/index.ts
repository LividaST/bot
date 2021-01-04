import express  from "express";

import {serverinfo, devstats} from "./Routes/GET/";

const app = express();

export default class API {
    constructor() {}
    loadAPI(client) {
        app.listen(client.options._apiPort, () => client.success(`API started on port ${client.options._apiPort}`));

        app.get("/devstats", (req, res) => devstats(client, null, res));
        app.get("/serverinfo", (req, res) => serverinfo(client, req, res));
        app.get("/serverinfo/:serverID", (req, res) => serverinfo(client, req, res));
        app.get("*", (req, res) => res.status(404).json({code: 404, msg: "endpoint not found"}));


        app.post("*", (req, res) => res.status(404).json({code: 404, msg: "endpoint not found"}));
    }
}