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
            .then(cachedUsers => {
                let count = cachedUsers.length, done = 1;
                client.info(`Loading cached members... 0/${count}`)
                cachedUsers.forEach((cachedUser, i) => {
                    setTimeout(() => {
                        process.stdout.moveCursor(0, -1)
                        process.stdout.clearLine(1);
                        client.info(`Loading cached members... ${done++}/${count}`)
                        client.users.fetch(cachedUser.id)
                    }, i * 10)
                })
            });
    }
}