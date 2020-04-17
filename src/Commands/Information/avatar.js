module.exports = {
  name: 'avatar',
  aliases: ['av', 'pfp'],
  category: 'Information',
  description: 'Shows the avatar of you, or a specified guild member.',
  usage: '[user]',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: (client, msg, args) => {
    try {
      let user;
      if(args[0]) {
        if(args[0].toLowerCase() == "random") {
          user = client.users.cache.random();
        } else {
          if(msg.mentions.users.size) {
            user = msg.mentions.users.first()
          } else {
            if(client.getUser(args[0])) user = client.getUser(args[0]);
          }
        }
      } else {
        user = msg.author;
      }
      
      const embed = new client.Embed()
        .setAuthor(`${user.tag}'s avatar • Requested by ${msg.author.tag}`, msg.author.avatarURL())
        .setDescription(`\`\`\`${user.avatarURL()}\`\`\``)
        .setImage(user.avatarURL())
      msg.channel.send(embed)
    } catch {
      msg.reply("the specified user was not found!");
    }
  }
}
