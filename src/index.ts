import Client from "./Util/Client/"
import chalk from "chalk";
import * as Database from "./Util/Database";

let {pmdDB, MongoClient} = Database;

export let Bot: Client;
export let db;

Database.connect()
    .then(start)
    .catch(e => console.log(`${chalk.bgRed(` ERROR `)} Could not connect to database:\n${chalk.bgMagenta(" STACK ")} ${e.stack}`));


function start(mongoClient) {
    MongoClient = mongoClient;
	pmdDB = MongoClient.db("botdev");
    console.log(`${chalk.bgGreen(` SUCCESS `)} Connected to the database.`);
    db = pmdDB;
    Bot = new Client({ debug: false }); 
}