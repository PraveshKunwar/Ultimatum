import { Client, Collection, Message } from 'discord.js';
import { readdirSync, lstat } from 'fs';

import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';

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

export const StartClient = (config: string | any): void => {
	const AllFiles = (path: string) => {
		const files = readdirSync(path);
		files.forEach((f) => {
			if (f.endsWith('.ts') || f.match(/.*\.ts$/)) {
				console.log(f);
			}
		});
	};
	const fil = AllFiles(`./dist/handlers/commands`);
	Ultimatum.login(config);
};

export default Ultimatum;
