const Embed = require('../assets/embed.js');

module.exports.run = async (client, message, args) => {
    let reason = args.join(' ');
    if (message.member.nickname && message.member.nickname.startsWith('[COCOONED] ')) {
      try {
        await message.member.setNickname(message.member.nickname.slice('[COCOONED] '.length));
        let embed = new Embed.Success(`You have been taken out of your cocoon! To return into your cocoon, please repeat this command!`).setThumbnail('https://media.giphy.com/media/ehyjBLZTkxNDRxrcfT/source.gif');
        if (reason) {
          embed.addField('Reason', reason);
        };
        message.channel.send(embed);
      } catch (e) {
        message.channel.send(new Embed.Error(`Sorry - I don't have permission to get you out of your cocoon. Please check that I have a higher role than you and that I have permission to change nicknames of people.`));
      };
    } else {
      try {
        await message.member.setNickname((`[COCOONED] ${message.member.displayName}`).slice(0, 32));
        let embed = new Embed.Success(`You have been cocooned! To get out of your cocoon, please use this command again!`).setThumbnail('https://media.giphy.com/media/KTQmReQxtmACY/giphy.gif');
        if (reason) {
          embed.addField('Reason', reason);
        };
        message.channel.send(embed);
      } catch (e) {
        message.channel.send(new Embed.Error(`Sorry - I don't have permission to put you in a cocoon. Please check that I have a higher role than you and that I have permission to change nicknames of people.`));
      };
    };
  };