const mongoose = require("mongoose");

const prefixSchema = new mongoose.Schema({
    guildID: String,
    prefix: String,
});

const xpSchema = new mongoose.Schema({
    userID: String,
    guildID: String,
    level: Number,
    xp: Number,
});

const Logs = new mongoose.Schema({
    guildID: String,
    modLogID: String,
    starboardChannelID: String,
    antiInviteChannelIDs: Array,
    antiSwear: Boolean,
    antiSpam: Boolean,
    updatedMessageLog: String,
    deletedMessageLog: String,
});

const Premium = new mongoose.Schema({
    guildID: String,
    embedColour: String,
});

module.exports = {
    Prefix: mongoose.model("Prefix", prefixSchema),
    Xp: mongoose.model("Xp", xpSchema),
    Logs: mongoose.model("Logs", Logs),
    Premium: mongoose.model("PremiumGuilds", Premium),
};