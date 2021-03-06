module.exports = {
  name: 'eval',
  aliases: ['ev'],
  category: 'Developer',
  description: 'Evaluate javascript code through a command',
  usage: '<code>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: false,
  premiumOnly: false,
  requiresArgs: false,
  run: async (client, msg, args) => {
    const bot = client

    let codein = args.join(' ')
    if (!args[0]) codein = "'No input given'"
    const inputt = new client.Embed().setFooter('Livida • Evaluation').setColor('ORANGE')
      .setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Output** (Type)
\`\`\`js
Evaluating...
\`\`\`
`)

    msg.channel.send(inputt).then(async message => {
      const notoken = ['bot.token', 'token', 'client.token', 'process.env.TOKEN']; const nodel = ['require("fs").unlink("/")', 'rm -rf', 'rm *', 'rm .']
      if (nodel.includes(codein)) return msg.edit(msg.content + '\n**Output** (Error)\n```You are not permitted to delete any files using evaluation!```')
      if (notoken.includes(codein)) return msg.edit(msg.content + '\n**Output** (Error)\n```You are not permitted to get the bots token using evaluation!```')

      try {
        const coe = (eval(codein)); let code = coe
        if (code && code.constructor && code.constructor.name === 'Promise') code = await code
        const type = code != null && code.constructor ? code.constructor.name : typeof code
        if (typeof code !== 'string')code = require('util').inspect(code, { depth: 0 })
        let output
        if (code.length > 1900) {
          client.fetch('https://hasteb.in/documents', { method: 'POST', body: code.replace(bot.token, 'Hiding bots token xoxo').replace(process.env.TOKEN, 'HIDING BOT TOKEN') })
            .then(res => res.json())
            .then(body => {
              code = (`https://hasteb.in/${body.key}`)
            })
        }
        const outputt = new client.Embed().setFooter('Livida • Evaluation').setColor('GREEN')
          .setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Output (${type.replace(bot.token, 'Hiding bots token xoxo').replace(process.env.TOKEN, '')})**
\`\`\`js
${code}
\`\`\`
`)
        message.edit(outputt).catch(e => {
          client.fetch
          ('https://hasteb.in/documents', {
            method: 'POST',
            body: code.replace(bot.token, 'Hiding bots token xoxo').replace(process.env.TOKEN, 'HIDING BOT TOKEN')
          }).then(res => res.json())
            .then(body => {
              return message.edit(`
                        ${msg.content}
        **Output:**\n\`\`\`js\nhttps://hasteb.in/${body.key}\n\`\`\``)
            })
        })
      } catch (e) {
        const errEmbed = new client.Embed().setColor('RED').setFooter('Livida • Evaluation')
          .setDescription(`
**Input**
\`\`\`js
${codein}
\`\`\`

**Error**
\`\`\`js
${e}
\`\`\`
`)
        message.edit(errEmbed)
      };
    })
  }
}
