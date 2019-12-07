const Discord = require('discord.js');
const config = require('../config.json');
let { embedColor, colors } = config;
let { red, green } = colors;
const { emojis } = config;
let check, cross;

const define = (client) => {
  check = client.emojis.get(emojis.check);
  cross = client.emojis.get(emojis.cross);
};

class Default {
    constructor(title, description, color) {
      color = color || embedColor;
      return new Discord.RichEmbed().setTitle(title).setDescription(description).setColor(color);
    };
};

class Error {
    constructor(message, title) {
        title = (title) ? title : `Error!`;
        return new Discord.RichEmbed().setTitle(`${cross} ${title}`).setDescription(message).setColor(red);
    };
};

class Success {
    constructor(message, title) {
        title = (title) ? title : `Success!`;
        return new Discord.RichEmbed().setTitle(`${check} ${title}`).setDescription(message).setColor(green);
    }
};

class CmdUsageErr {
    constructor(name,usage) {
        let s = (usage) ? `${name} ${usage}` : name;
        return new Discord.RichEmbed().setTitle(`${cross} Error!`).setDescription(`Incorrect command usage!\nCommand usage: \`${s}\``).setColor(red);
    };
};

module.exports = 
{
  "define": define,
  "Default": Default,
  "Error": Error,
  "Success": Success,
  "CmdUsageErr": CmdUsageErr,
};