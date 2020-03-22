const fortnite = require('fortnite.js'), fetch = require("node-fetch");
module.exports = {
    name: 'stats',
    aliases: ["gamestats", "statistics"],
    category: 'Core',
    description: 'View user statistics for a specific game!',
    usage: '<game> <username> [DEVICE]',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: true,
    run: async (client, msg, args) => {
        switch(args[0].toLowerCase()) {
            case "fortnite":
                switch(args[2]) {
                    case "ps4":
                        getStats("fortnite", args[1], fortnite.PS4)
                    break;
                    case "xbox":
                        getStats("fortnite", args[1], fortnite.XBOX)
                    break;
                    case "pc":
                        getStats("fortnite", args[1], fortnite.PC)
                    break;
                    default:
                        msg.channel.send({embed: {
                            description: "The specified device was not found, it must be one of the following: `pc, xbox, ps4`"
                        }})
                    break;

                }
            break;
            default:
                msg.channel.send({embed: {
                    description: `${message.author}, that game was not found or we are not providing statistics for the specified game`
                }})
            break;
        }

        function getStats(input, username, device) {
            switch(input) {
                case "fortnite":
                    const fortnite = require('fortnite.js'), fetch = require("node-fetch")
                    const fn = new fortnite(process.env.FORTNITE_API_KEY);                   
                       fn.get(username, fortnite.PS4)
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
                break;
            }
        }
    }
  }
  