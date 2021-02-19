import { Client, Collection, Message } from 'discord.js';
import glob from 'glob';
import { eventNames } from 'process';

import { Command } from './interfaces/Command';
import { Event } from './interfaces/Event';

const Ultimatum: Client = new Client({
	disableMentions: 'all',
	fetchAllMembers: true,
});

export const CmdCollection: Collection<
	string | string[],
	Command
> = new Collection();
export const EvtCollection: Collection<
	string | string[],
	Event
> = new Collection();

export const StartClient = async (config: string | any): Promise<void> => {
	//cmd handler
	glob(`./dist/handlers/commands/**/*{.js,.ts}`, (err, files) => {
		err ? console.log(err) : false;
		files.map(async (f) => {
			if (f.endsWith('.js') || f.match(/.*\.js$/)) {
				const Command = f.split('./dist/handlers/commands/')[1];
				const props = require(`./handlers/commands/${Command}`);
				const CommandName = Command.split('/')[1].split('.')[0];
				CmdCollection.set(CommandName, props);
			}
		});
	});

	//evt handler
	glob(`./dist/handlers/events/**/*{.js,.ts}`, (err, files) => {
		err ? console.log(err) : false;
		files.map(async (f) => {
			if (f.endsWith('.js') || f.match(/.*\.js$/)) {
				const Event = f.split('./dist/handlers/events/')[1];
				const props = require(`./handlers/events/${Event}`);
				const EventName = Event.split('/')[1].split('.')[0];
				console.log(EventName);
				CmdCollection.set(EventName, props);
				Ultimatum.on(EventName, (...args) => {
					props.run(Ultimatum, ...args);
				});
			}
		});
	});
	Ultimatum.login(config);
	if (!config) {
		process.exit(1);
	}
};

export default Ultimatum;
