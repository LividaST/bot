import API from "../Util/API";

module.exports = {
    name: "ready",
    type: "client",
    run: (client) => {
        new API().loadAPI(client);
        client.success(`Connected as ${client.user.tag}`);
        setInterval(() => {
            if(!client.maxPing || client.maxPing < client.ws.ping) client.maxPing = client.ws.ping;
            if(!client.minPing || client.minPing > client.ws.ping) client.minPing = client.ws.ping;
        }, 2000)
    }
}