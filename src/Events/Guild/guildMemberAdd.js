module.exports = {
  name: 'guildMemberAdd',
  run: async (client, member) => {
    const guild = member.guild
    if (guild.id === '630433870659190815') {
      const embed = new client.Embed()
        .setTitle('Welcome to Livida!')
        .setURL('https://livida.net')
        .setDescription(`${member.user.username}, welcome to Livida! If you need any help feel free to message <@544943898980646922>.`)
        .addField('Membercount', guild.memberCount)
      guild.channels.cache.get('696081501044867143').send(member, embed)
    }
  }
}
