const express = require('express')
const bodyParser = require('body-parser')
const client = require(`${process.cwd()}/src/index.js`)
var app = express()
var port = process.env.PORT
var listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener._connectionKey.split('::::')[1])
}); var channel = '656498579518783508'

app.use(bodyParser.json())
app.post('/newBlogPost', function (req, res) {
  const post = req.body.post.current; const thumbnail = (post.feature_image || 'https://i.imgur.com/o1KuRqv.png')
  const embed = new client.Embed()
    .setTitle(post.title)
    .setAuthor(`Author: ${post.primary_author.name}`)
    .setURL(post.url)
    .setDescription(post.plaintext)
    .setColor('#45A5FC')
    .setThumbnail(thumbnail)
    .setTimestamp()
    .setFooter('Published')
  client.channels.cache.get(channel).send(embed)
  res.json({ success: true })
})
