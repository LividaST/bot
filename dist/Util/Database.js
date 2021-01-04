"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.pmdDB = exports.MongoClient = void 0;
const mongodb_1 = require("mongodb");
const connect = async () => await mongodb_1.MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
exports.connect = connect;
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
//# sourceMappingURL=Database.js.map