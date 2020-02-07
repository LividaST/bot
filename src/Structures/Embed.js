const { RichEmbed } = require("discord.js");
const { x, check} = require("./Constants/Emojis");

module.exports = class Embed extends RichEmbed {
    constructor(data) {
		super(data);
		this.setColor("BLUE");
    };

    error(msg) {
		this.setColor("RED")
			.setDescription(`${x} ${msg}`);
		return this;
	};

	none(msg) {
		this.setColor("BLUE")
			.setDescription(msg);
		return this;
	};

	success(msg) {
		this.setColor("GREEN")
			.setDescription(`${check} ${msg}`);
		return this;
	};

	warn(msg) {
		this.setColor("#F7DC6F")
			.setDescription(`:warning: ${msg}`);
		return this;
	};

	field(header, msg) {
		this.addField(header, msg);
		return this;
	};
};