module.exports = {
    name: 'skip',
    aliases: ['next', 's'],
    category: 'Music',
    description: 'Skips the current track!',
    usage: '',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
      const { channel } = msg.member.voice;
      const player = client.music.players.get(msg.guild.id);
      if(!player) return msg.channel.send(new client.Embed().error(`No songs currently playing in this server!`));
      if(!channel || channel.id !== player.voiceChannel.id) return msg.channel.send(new client.Embed().error(`You need to be in the same voice channel as me to use the leave command!`));
      player.stop();
      return msg.channel.send("Skipped the current song!");
    }
  }