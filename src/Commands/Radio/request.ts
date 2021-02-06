module.exports = {
    config: {
        name: "request",
        aliases: [],
        category: "Radio",
        usage: "",
        description: "",
        hidden: false,
        permissions: {
            developer: false
        }
    },
    run: async (client, message, args) => {
        let embed: any = {
            description: "Searching...",
            color: "#8800ff"
        };

        if (!args[0]) return message.channel.send({
            embed: {
                description: "Please provide a song name/artist!",
                color: "RED"
            }
        })

        message.channel.send({embed}).then(msg=> {
            let searchParams = args.join("+");
            client.fetch(`https://api.deezer.com/search?q=${searchParams}`)
                .then(res => res.data)
                .then(json => {
                    if(json.total < 1) noResults(msg);
                    else showResults(msg, json);
                })
        })

        function noResults(msg) {
            embed = {
                description: "No tracks were found relating to your search query, submit request anyways?",
                color: "RED"
            };
            
            msg.edit({embed}).then(_ => {
                let responded = false;
                msg.react("✅").then(_ => msg.react("❌"));

                const yes = (reaction) => reaction.emoji.name == "✅", 
                    nopleas = (reaction) => reaction.emoji.name == "❌",
                    sure = msg.createReactionCollector(yes, { time: 1000000 }), 
                    no = msg.createReactionCollector(nopleas, { time: 1000000 });
                
                sure.on("collect", (_, member) => {
                    if(member.id !== message.author.id) return msg.reactions.cache.find(r => r._emoji.name == "✅").users.remove(message.author.id);;
                    responded = true;
                    msg.reactions.removeAll();
                    msg.edit({embed: {description: `${message.author}, your request has been submitted successfully!`, color: "GREEN"}});
                    msg.delete({timeout: 3000});
                    message.delete({timeout: 3000});
                    client.requestSong(args.join(' '), message.author.tag)
                })

                no.on("collect", (_, member) => {
                    if(member.id !== message.author.id) return msg.reactions.cache.find(r => r._emoji.name == "❌").users.remove(message.author.id);;
                    responded = true;
                    msg.reactions.removeAll();
                    msg.edit({embed: {description: `${message.author}, cancelling request!`, color: "RED"}});
                    msg.delete({timeout: 3000});
                    message.delete({timeout: 3000});
                })

                setTimeout(() => {
                    if(responded) return;
                    msg.edit({embed: {description: `${message.author}, your request has timed out!`}});
                    msg.delete({timeout: 3000});
                    message.delete({timeout: 3000});
                }, 15000)
            })
        }

        function showResults(msg, results) {
            let query = args.join(" "), responded = false, result = 0;
            nextPage(1);
            msg.react("✅").then(_ => msg.react("❌"))

            const yes = (reaction) => reaction.emoji.name == "✅", 
                nopleas = (reaction) => reaction.emoji.name == "❌",
                next = (reaction) => reaction.emoji.name == "➡",
                back = (reaction) => reaction.emoji.name == "⬅",
                sure = msg.createReactionCollector(yes, { time: 1000000 }), 
                nxt = msg.createReactionCollector(next, { time: 1000000 }),
                bck = msg.createReactionCollector(back, { time: 1000000 }),
                no = msg.createReactionCollector(nopleas, { time: 1000000 });

            sure.on("collect", (_, member) => {
                if(member.id !== message.author.id) return msg.reactions.cache.find(r => r._emoji.name == "✅").users.remove(message.author.id);;
                responded = true;
                msg.reactions.removeAll();
                msg.edit({embed: {description: `${message.author}, your request has been submitted successfully!`, color: "GREEN"}});
                msg.delete({timeout: 3000});
                message.delete({timeout: 3000});
                client.requestSong(results.data[result-1].artist.name + " - " + results.data[result-1].title, message.author.tag)
            })

            no.on("collect", (_, member) => {
                if(member.id !== message.author.id) return msg.reactions.cache.find(r => r._emoji.name == "❌").users.remove(message.author.id);;
                responded = true;
                msg.reactions.removeAll();
                msg.edit({embed: {description: `${message.author}, cancelling request!`, color: "RED"}});
                msg.delete({timeout: 3000});
                message.delete({timeout: 3000});
            })

            nxt.on("collect", (_, member) => {
                if(member.id !== message.author.id) return msg.reactions.cache.find(r => r._emoji.name == "➡").users.remove(message.author.id);;
                msg.reactions.cache.find(r => r._emoji.name == "➡").users.remove(message.author.id);
                nextPage(1);
                if(!results.data[result]) msg.reactions.cache.find(r => r._emoji.name == "➡").users.remove(client.user.id);
            });

            bck.on("collect", (_, member) => {
                if(member.id !== message.author.id) return msg.reactions.cache.find(r => r._emoji.name == "⬅").users.remove(message.author.id);;
                msg.reactions.cache.find(r => r._emoji.name == "⬅").users.remove(message.author.id);
                nextPage(0);
                if(result-1 <= 0) msg.reactions.cache.find(r => r._emoji.name == "⬅").users.remove(client.user.id);
            });

            function nextPage(direction) {
                direction != 1 ? result-- : result++;
                embed = {
                    description: `Showing result ${result} of ${results.total} for query \`${query.substr(0,  25) + (query.length > 25 ? "..." : "")}\``,
                    color: "GREEN",
                    thumbnail: {
                        url: results.data[result-1].album.cover,
                        proxy_url: results.data[result-1].album.cover
                    },
                    fields: [
                        {
                            name: "Track",
                            value: `[${results.data[result-1].title}](${results.data[result-1].link}) by [${results.data[result-1].artist.name}](${results.data[result-1].artist.link})`,
                            inline: false
                        },
                        {
                            name: "Options",
                            value: `✅ - Request this track\n❌ - Cancel request${!results.data[result] ? "" : "\n➡ - View next result"}${result-1 <= 0 ? "" : "\n⬅ - View previous result"}`
                        }
                    ],
                    footer: `l!songinfo ${results.data[result-1]} - View more info about this song`
                };
    
                msg.edit({embed}).then(_ => {
                    if(results.total != result) msg.react("➡");
                    if(result-1 > 0) msg.react("⬅");
                });
            }

            setTimeout(() => {
                if(responded) return;
                msg.reactions.removeAll();
                msg.edit({embed: {description: `${message.author}, your request has timed out!`}});
                msg.delete({timeout: 3000});
                message.delete({timeout: 3000});
            }, 60 * 1000)
        }
    }
}