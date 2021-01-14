import API from "../Util/API";
import Caching from "../Util/Client/Caching";

module.exports = {
    name: "ready",
    type: "client",
    run: (client) => {
        client.success(`Connected as ${client.user.tag}`);

        let api = new API(), cache = new Caching();

        client.cache = cache;

        setInterval(() => cache.updateCache(client), 15000)
        setInterval(() => {
            if(!client.maxPing || client.maxPing < client.ws.ping) client.maxPing = client.ws.ping;
            if(!client.minPing || client.minPing > client.ws.ping) client.minPing = client.ws.ping;
        }, 2000)
        
        api.loadAPI(client);
        cache.loadCache(client);
        cache.updateCache(client);
    }
}