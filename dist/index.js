"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.Bot = void 0;
const Client_1 = __importDefault(require("./Util/Client/"));
const chalk_1 = __importDefault(require("chalk"));
const Database = __importStar(require("./Util/Database"));
let { pmdDB, MongoClient } = Database;
Database.connect()
    .then(start)
    .catch(e => console.log(`${chalk_1.default.bgRed(` ERROR `)} Could not connect to database:\n${chalk_1.default.bgMagenta(" STACK ")} ${e.stack}`));
function start(mongoClient) {
    MongoClient = mongoClient;
    pmdDB = MongoClient.db("botdev");
    console.log(`${chalk_1.default.bgGreen(` SUCCESS `)} Connected to the database.`);
    exports.db = pmdDB;
    exports.Bot = new Client_1.default({ debug: false });
}
//# sourceMappingURL=index.js.map