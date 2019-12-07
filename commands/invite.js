const Embed = require("../assets/embed.js");

module.exports.run = async (client, message, args) => {
  message.channel.send(
    new Embed.Default(
      "Livida Bot Invite", "Want me in your server? Invite me using this link: https://livida.cc/discordbot"
    )
  );
};