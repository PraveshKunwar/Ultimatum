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
		'./dist/handlers/commands/misc',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/misc/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	readdir(
		'./dist/handlers/commands/moderation',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/moderation/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);
	readdir(
		'./dist/handlers/commands/music',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/music/${f}`);
					CmdCollection.set(CmdName, props);
				});
			}
		}
	);

	readdir(
		'./dist/handlers/commands/profile',
		(err: any, files: string[] | any[]) => {
			err ? console.log(err) : false;
			if (files.length < 0) {
				return console.log('No commands!');
			} else {
				files.forEach((f) => {
					const CmdName: string = f.split('.')[0];
					const props = require(`./handlers/commands/profile/${f}`);
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
