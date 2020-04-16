module.exports = {
    name: 'statistics',
    aliases: ["stats"],
    category: 'Radio',
    description: 'Get current live statistics for Livida Radio!',
    usage: '',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        client.fetch("http://radio.livida.net/api/nowplaying/1").then(res => res.json())
        .then(json => {
            let embed = new client.Embed()
                .setDescription(
`
${json.live.is_live ? `${json.live.streamer_name} is current broadcasting` : "We are broadcasting an automated session"} to ${json.listeners.unique} listeners!

**Song**
${json.now_playing.song.text}

You can tune in via [our website](https://livida.net/radio)${msg.guild.id === "630433870659190815" ? `or [our discord bot](https://discord.gg/qfQKrv8)`: ""}!
`
                )
                .setThumbnail(json.now_playing.song.art)
        })
    }
  }
  