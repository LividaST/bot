"use strict";
module.exports = async function (client, req, res) {
    let uptime1 = await uptime();
    res.json({
        response: true,
        sections: [
            {
                name: "Listeners",
                value: `${client.statistics.listeners || 0} (Peak: ${client.peakListeners || 0})`
            },
            {
                name: "Bot Uptime",
                value: uptime1
            },
            {
                name: "Bot Websocket Latency",
                value: `${client.ws.ping}ms (Min:  ${client.minPing ? client.minPing + "ms" : "Unknown"}  / Max: ${client.maxPing ? client.maxPing + "ms" : "Unknown"})`
            },
            {
                name: "Bot Message Latency",
                value: `Min: ${client.minMessageLatency ? client.minMessageLatency + "ms" : "Unknown"} / Max: ${client.maxMessageLatency ? client.maxMessageLatency + "ms" : "Unknown"}`
            },
            {
                name: "Bot Memory Usage",
                value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
            },
            {
                name: "Canvas Generation",
                value: `${client.canvasGenerationLatency || 0}ms (Min: ${client.minCanvasGenerationLatency || 0}ms / Max: ${client.maxCanvasGenerationLatency || 0}ms)`
            }
        ]
    });
    function uptime() {
        let days = Math.floor(client.uptime / 86400000), hours = Math.floor(client.uptime / 3600000) % 24, minutes = Math.floor(client.uptime / 60000) % 60, seconds = Math.floor(client.uptime / 1000) % 60;
        return `${days ? days + " Days, " : ""}${hours ? hours + " Hours, " : ""}${minutes ? minutes + " Minutes, " : "0 Minutes, "}${seconds ? seconds + " Seconds" : "0 Seconds"}`;
    }
};
//# sourceMappingURL=devstats.js.map