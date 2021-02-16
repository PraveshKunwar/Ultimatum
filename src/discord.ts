import { Client, Collection, Message } from 'discord.js';
import { readdir } from 'fs';

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

export const StartClient = (config: string | any): void => {
	//cmd handler!
	readdir(
		'./dist/handlers/commands/Docs',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/Docs/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	readdir(
		'./dist/handlers/commands/Misc',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/Misc/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	readdir(
		'./dist/handlers/commands/Moderation',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/Moderation/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	readdir(
		'./dist/handlers/commands/Owner',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/Owner/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	readdir(
		'./dist/handlers/commands/Profile',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/Profile/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	//evt handler

	readdir('./dist/handlers/events', (err: any, files: string[] | any[]) => {
		err ? console.log(err) : false;

		files.forEach((f: string) => {
			const EvtName: string = f.split('.')[0];
			const props = require(`./handlers/events/${f}`);
			EvtCollection.set(EvtName, props);
			Ultimatum.on(EvtName, (...args) => {
				props.run(Ultimatum, ...args);
			});
		});
	});
	Ultimatum.login(config);
};

export default Ultimatum;
