module.exports = {
  name: 'guildMemberAdd',
  run: async (client, member) => {
    const guild = member.guild
    const welcomeGuilds = ['630433870659190815', '541641323342462986']
    if (welcomeGuilds.includes(guild.id)) {
      const embed = new client.Embed()
        .setTitle(`Welcome to ${guild.name}!`)
        .setURL('https://livida.net')
        .setDescription(`${member.user.username}, welcome to ${guild.name}! If you need any help feel free to message <@544943898980646922>.`)
        .addField('Membercount', guild.memberCount)
      guild.channels.cache.find(x => x.name === 'welcome').send(member, embed)
    }
  }
}
