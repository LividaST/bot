export = function (client, req, res) {
    let server = client.guilds.cache.get(req.params.serverID) || client.guilds.cache.get(client.config.main_guild);
    res.json({
        name: server.name,
        member_count: server.memberCount,
        cached_members: server.members.cache,
        channels: server.channels.cache,
        roles: server.roles.cache
    })
}