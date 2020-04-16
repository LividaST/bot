const cooldown = new Set()
const Sentry = require('@sentry/node')

module.exports = {
  name: 'message',
  run: async (client, msg) => {
  if(msg.guild) {
    var { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`),
    query = {guildID: msg.guild.id};
    Logs.findOneAndUpdate(query, {guildID: msg.guild.id}, {upsert: true}, function(err, doc) {
      if (err) return msg.channel.send(err);
    });
  }


    if (msg.author.bot) return

 
    const prefixMention = new RegExp(`^<@!?${client.user.id}> `)
    const prefix = msg.content.match(prefixMention) ? msg.content.match(prefixMention)[0] : client.prefix

    if (msg.content.startsWith(prefix)) {
      const args = msg.content.slice(prefix.length).trim().split(' ')
      const cmd = args.shift().toLowerCase()
      try {
        const command = client.commands.has(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd))
        if (command) {
          if (cooldown.has(msg.guild.id)) return;
          if (command.premiumOnly === true && await client.Models.Premium.findOne({ guildID: msg.guild.id }) === null) return client.Errors.premiumOnly(msg.channel);
          if (command.permissions && !msg.member.hasPermission(command.permissions) && !client.creators.ids.includes(msg.author.id)) return client.Errors.noPerms(msg.channel, command.permissions);
          if (command.clientPerms && !msg.guild.me.hasPermission(command.clientPerms)) return client.Errors.noClientPerms(msg.channel, command.clientPerms);
          if (command.requiresArgs === true && args.length < 1) return client.Errors.noArgs(msg.guild, msg.channel, command.name);
          if (command.creatorOnly && !client.creators.ids.includes(msg.author.id)) return;

          command.run(client, msg, args)

          setTimeout(function () {
            cooldown.delete(msg.guild.id)
          }, 3000)
        };
      } catch (err) {
        client.log(err)
        client.Errors.unknownErr(msg, err)
        Sentry.captureException(err)
      };
    } else {
      if (msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        msg.channel.send(new client.Embed().none(`Hey there! I am **${client.user.username}**, here to help! To get started just type \`${prefix}help\` and everything will come up!`).setFooter('This message will delete in 20 secodns')).then(m => m.delete(20000))
      };
    };
  }
}
