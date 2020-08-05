const express = require('express')
const bodyParser = require('body-parser')
const client = require(`${process.cwd()}/src/index.js`)
var app = express()
var port = process.env.PORT
var listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener._connectionKey.split('::::')[1])
})

app.use(bodyParser.json())
app.post('/radioRequest', function (req, res) {
  const request = req.body
  if (request.model !== 'requests') return res.json({ success: false })
  const embed = new client.Embed()
    .setAuthor(request.entry.type)
    .setDescription(request.entry.content)
    .setFooter(`ID: ${request.entry.id}`)
  client.channels.cache.get('705973641048883241').send(embed)
  res.json({ success: true })
})
