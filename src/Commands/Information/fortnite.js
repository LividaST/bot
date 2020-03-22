const fortnite = require('fortnite.js');
module.exports = {
    name: 'fortnite',
    aliases: ["fn", "fnstats"],
    category: 'Core',
    description: 'View user statistics for fortnite!',
    usage: '<username> [device]',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        if(args[1]) {
            switch(args[1].toLowerCase()) {
                case "ps4":
                    getStats(args[0], fortnite.PS4)
                break;
                case "xbox":
                    getStats(args[0], fortnite.XBOX)
                break;
                case "pc":
                    getStats(args[0], fortnite.PC)
                break;
            }  
        } else {
            getStats(args[0], fortnite.PC)
        }


        function getStats(username, device) {
                    const fn = new fortnite(process.env.FORTNITE_API_KEY);                   
fn.get(username, device)
    .then(body => {
    const embed = new client.Embed()
    .setTitle(`Fortnite Statistics • ${username} • ${device.replace("fortnite.", "")}`)
    .setDescription(`
   **Matches Played:** ${body.stats.matches}
   **Top 1** ${body.stats.top1}
   **Top 3** ${body.stats.top3}
   **Top 5** ${body.stats.top5}
   **Top 25 **${body.stats.top25}
   **Win Percentage** ${body.stats.winPercent}
   **Score** ${body.stats.score}
   `)
                       msg.channel.send(embed)
               })
        }
    }
  }
  