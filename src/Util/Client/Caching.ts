export default class CacheManager {
    updateCache(client) {
        client.users.cache
            .forEach(user => 
                client.db
                    .collection("cachedUsers")
                    .findOneAndUpdate({ id: user.id }, { $set: { cached: true } }, { upsert: true })
            )
    }

    loadCache(client) {
        client.db
            .collection("cachedUsers")
            .find({cached: true})
            .toArray()
            .then(cachedUsers => 
                cachedUsers.forEach(cachedUser => 
                    client.users.fetch(cachedUser.id)
                )
            );
    }
}