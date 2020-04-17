const { resolve } = require('path')
    , { readdirSync, statSync } = require('fs');

class loadCommands {
    constructor(client) {
        function find_nested (dir, pattern) {
            let results = []
            readdirSync(dir).forEach(inner_dir => {
              inner_dir = resolve(dir, inner_dir)
              const stat = statSync(inner_dir)
              if (stat.isDirectory()) {
                results = results.concat(find_nested(inner_dir, pattern))
              };
              if (stat.isFile() && inner_dir.endsWith(pattern)) {
                results.push(inner_dir)
              };
            })
            return results
          };
          const cmd_files = find_nested(resolve(`${__dirname}/${process.env.COMMAND_DIR}`), '.js')
          cmd_files.forEach(file => {
            const props = require(file)
            new addCommand(client, props, props.name)
            props.aliases.forEach(alias => {
              new addAlias(client, alias, props.name)
            })
          })
    }
}

class loadEvents {
    constructor(client) {
        const folders = readdirSync(resolve(`${__dirname}/${process.env.EVENT_DIR}`))
        for (const folder of folders) {
          const files = readdirSync(resolve(`${__dirname}/${process.env.EVENT_DIR}/${folder}`)).filter(f => f.endsWith('.js'))
          for (const file of files) {
            const event = require(resolve(`${__dirname}/${process.env.EVENT_DIR}/${folder}/${file}`))
            , name = event.name ? event.name : file.split('.')[0]
            client.on(name, event.run.bind(null, client))
          };
        };
    }
}


class addCommand {
  constructor (client, options={
    name: '',
    aliases: [],
    category: 'Core',
    description: '',
    usage: '',
    permissions: 'SEND_MESSAGES',
    clientPerms: 'SEND_MESSAGES',
    creatorOnly: false,
    guildOnly: false,
    premiumOnly: false,
    requiresArgs: false,
    run: (client, msg, args) => {}
  }) {
    this.client = client;
    client.commands.set(options.name, options);
  }
}
class addAlias {
  constructor (client, alias, name) {
    this.client = client;
      client.aliases.set(alias, name)
  }
}
  

module.exports = {
    addCommand: addCommand,
    loadCommands: loadCommands,
    loadEvents: loadEvents
};