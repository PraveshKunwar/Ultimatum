import { Client, Collection, Guild, Intents, Message } from 'discord.js';
import glob from 'glob';
require('dotenv').config();

import { Command } from './interfaces/Command';
import { Event } from './interfaces/Event';
import ErrorEmbed from './errors/ErrorEmbed';
import { Mongo } from './util/Mongoose';
import { BlockQuote, OneQuote } from './util/Quote';

import { DatabaseManager } from './managers/DatabaseManager';

class Ultimatum extends Client {
	public commands: Collection<string | string[], Command> = new Collection();
	public events: Collection<string | string[], Event> = new Collection();
	public aliases: Collection<string, Command> = new Collection();
	public categories: Set<string> = new Set();
	public description: Collection<string, Command> = new Collection();
	public client: Client = this;
	public database: Mongo;
	public DatabaseManager: DatabaseManager;
	public ErrorEmbed = ErrorEmbed;
	public BlockQuote = BlockQuote;
	public OneQuote = OneQuote;
	public constructor() {
		super({
			fetchAllMembers: true,
			retryLimit: Number.POSITIVE_INFINITY,
			ws: {
				intents: Intents.ALL,
			},
			partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
		});
	}
	public async StartClient<T extends Promise<T>>(
		config: string | undefined
	): Promise<void> {
		process.on('unhandledRejection', (res: any, promise: T) => {
			console.log(`Error: ${res}\n Where: ${promise}`);
		});
		this.DatabaseManager = new DatabaseManager();
		this.database = new Mongo();
		this.database.Init(process.env.MONGO_DB_PASSWORD);
		glob(`./dist/commands/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const CommandPath = f.split('./dist/commands/')[1];
					const props = require(`./commands/${CommandPath}`);
					this.commands.set(props.name, props);
					this.categories.add(props.category);
					if (props.aliases) {
						props.aliases.map((alias: string) => {
							this.aliases.set(alias, props);
						});
					}
					if (props.desc) {
						this.description.set(props.desc, props);
					}
				}
			});
		});
		//evt handler
		glob(`./dist/events/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const Event = f.split('./dist/events')[1];
					const props: Event = require(`./events/${Event}`);
					this.events.set(props.name, props);
					this.on(props.name, props.run.bind(null, this));
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
