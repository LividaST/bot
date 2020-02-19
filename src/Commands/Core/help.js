module.exports = {
  name: 'help',
  aliases: ['cmds', 'commands'],
  category: 'Core',
  description: 'Get help on the bot',
  usage: '<command | category>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: false,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const prefixDB = await client.Models.Prefix.findOne({
      guildID: msg.guild.id
    })
    let commandSize = client.commands.size
    const embed = new client.Embed()
      .setColor(msg.guild.me.highestRole.color || 'BLUE')
      .setFooter(`Currently running ${commandSize} commands! | < optional >  [ required ]`)

    if (!args[0]) {
      const categories = client.commands.map(c => c.category).reduce((a, b) => {
        if (a.indexOf(b) < 0) a.push(b)
        return a
      }, []).sort()

      categories.forEach(c => {
        let commands = client.commands.filter(command => command.category === c)
        commands = commands.map(cmd => cmd.name)
        if (commands.length <= 0) return
        commandSize += commands.length
        embed.addField(c, `\`${commands.sort().join('`, `')}\``)
      })
      return msg.channel.send(embed)
    } else {
      const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
      if (!command) {
        const categories = client.commands.filter(c => c.category.includes(args.join(' ')))
        if (!categories) return msg.channel.send(new client.Embed().error('I could not find that category or command!'))
        const commands = client.commands.filter(c => c.category.toLowerCase().includes(args.join(' ').toLowerCase()))
        if (!commands.size) return msg.channel.send(new client.Embed().error('I could not find any commands for that category!'))
        embed.addField(`**Query:** ${args.join(' ')}`, `${commands.map(c => `\`${c.name}\` `)}`)
        return msg.channel.send(embed)
      } else if (command) {
        embed.setAuthor(`${command.category.toLowerCase()}:${command.name.toLowerCase()}`, msg.author.avatarURL)
        embed.setDescription(`\`\`\`yaml\n${command.description}\`\`\``)
        if (command.aliases.length >= 1) embed.addField('Aliases', `\`${command.aliases.join('`, `')}\``)
        if (command.usage !== null) embed.addField('Usage', `${prefixDB ? prefixDB.prefix : client.prefix}${command.name} ${command.usage}`, true)
        if (command.permissions !== null) embed.addField('Required Permissions', `User: \`${command.permissions}\`\nClient: \`${command.clientPerms}\``)
        embed.addField('Premium Only', command.premiumOnly ? command.premiumOnly : false, true)

        return msg.channel.send(embed)
      } else return msg.channel.send(new client.Embed().error('I could not find that category or command!'))
    };
  }
}
