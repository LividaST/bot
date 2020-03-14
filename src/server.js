const discord = require("discord.js"),
      express = require("express"),
      bodyParser = require("body-parser");


module.exports = client => {
    var app = express(),
        port = 3000,
        listener = app.listen(port, () => {
            console.log("Your app is listening on port " + listener._connectionKey.split("::::")[1])
        }),
    channel = "656498579518783508"; // ID of channel. Currently set to Livida's announcements.
    app.use(bodyParser.json());
    app.post("/newBlogPost", function(req, res){
        let post = req.body.post.current, thumbnail = (post.feature_image || "https://i.imgur.com/o1KuRqv.png"),
            embed = new discord.RichEmbed()
            .setTitle(post.title)
            .setAuthor(`Author: ${post.primary_author.name}`)
            .setURL(post.url)
            .setDescription(post.plaintext)
            .setColor("#45A5FC")
            .setThumbnail(thumbnail)
            .setTimestamp()
            .setFooter(`Published`)
        client.channels.get(channel).send(embed);
        res.json({success: true});
    });
};
