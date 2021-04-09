const { Client, Collection } = require('discord.js');
const glob = require("")

class BotName extends Client {
	commands = new Collection();
	events = new Collection();
	constructor(token) {
        this.login(token);
        glob.sync(`./commands/**/*{.js}`, (err, files) => {
            err ? console.log(err) : false; //brb
        })
    }
}

export { BotName };
