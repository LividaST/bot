module.exports = class Errors {
  constructor (client) {
    this.client = client
  };

  unknownErr (msg, err) {
    try {
      const bugs = this.client.channels.cache.get(this.client.bugReportsChannelID)
      const embed = new this.client.Embed()
        .setAuthor('An unknown error occured!')
        .setColor('RED')
        .addField('Error', err.message)
        .addField('In server', `**${msg.guild.name}**  \`${msg.guild.id}\``, true)
        .addField('By user', `${msg.author}  **${msg.author.tag}**  \`${msg.author.id}\``, true)
        .setTimestamp()
      bugs.send(embed)
    } catch (err) {
      this.client.log(err)
    };
    msg.channel.send(new this.client.Embed().error('There was an unexpected error. This error has been automaticaly reported to the developers! Please try again.'))
  };

  async noArgs (guild, channel, commandName) {
    const prefix = await this.client.Models.Prefix.findOne({
      guildID: guild.id
    })
    channel.send(new this.client.Embed().error(`That command requires arguments! Correct usage \`${prefix ? prefix.prefix : '-'}${commandName} ${this.client.commands.get(commandName).usage}\``))
  };

  cooldown (channel) {
    channel.send(new this.client.Embed().error('The cooldown for that command has not expired. Please try again later!'))
  };

  async invalidArgs (guild, channel, commandName) {
    const prefix = await this.client.Models.Prefix.findOne({
      guildID: guild.id
    })
    channel.send(new this.client.Embed().error(`That is not the correct usage for that command! Correct usage \`${prefix ? prefix.prefix : '?'}${commandName} ${client.commands.get(commandName).usage}\``))
  };

  noClientPerms (channel, permission) {
    channel.send(new this.client.Embed().error(`I do not have the \`${permission}\` permission(s) to execute that command. Please make sure I have the right permissions and that the target member's role is below my role!`))
  };

  noPerms (channel, perms) {
    channel.send(new this.client.Embed().error(`You are lacking the \`${perms}\` permission(s) to use that command!`))
  };

  premiumOnly (channel) {
    channel.send(new this.client.Embed().error('That command is premium only!'))
  };
}
