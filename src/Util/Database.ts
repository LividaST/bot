import { MongoClient as mongoClient, Db } from "mongodb";

export let MongoClient: mongoClient;
export let pmdDB: Db;

export const connect = async () => await mongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });


// export function connect() {
// 	return new Promise<mongoClient>((resolve, reject) => {
// 		mongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
// 			.then(mongoClient => {
// 				MongoClient = mongoClient;
// 				pmdDB = MongoClient.db("botdev");
// 				resolve(mongoClient);
// 			})
// 			.catch(reject);
// 	});
// }