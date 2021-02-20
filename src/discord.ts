import { Client, Collection, Message } from 'discord.js';
import glob from 'glob';
import { eventNames } from 'process';

import { Command } from './interfaces/Command';
import { Event } from './interfaces/Event';

class Ultimatum extends Client {
	constructor() {
		super({
			disableMentions: 'all',
			fetchAllMembers: true,
		});
	}
	public commands: Collection<string | string[], Command> = new Collection();
	public events: Collection<string | string[], Event> = new Collection();
	public async StartClient(config: string | undefined): Promise<void> {
		glob(`./dist/handlers/commands/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const CommandPath = f.split('./dist/handlers/commands/')[1];
					const props = require(`./handlers/commands/${CommandPath}`);
					this.commands.set(props.name, props);
				}
			});
		});

		//evt handler
		glob(`./dist/handlers/events/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const Event = f.split('./dist/handlers/events')[1];
					const props = require(`./handlers/events/${Event}`);
					this.events.set(props.name, props);
					this.on(props.name, (...args) => {
						props.run(Ultimatum, ...args);
					});
				}
			});
		});
		this.login(config);
		if (!config) {
			process.exit(1);
		}
	}
}
export { Ultimatum };
