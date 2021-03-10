import { Client, Collection, Message } from 'discord.js';
import glob from 'glob';
require('dotenv').config();

import { Command } from './interfaces/Command';
import { Event } from './interfaces/Event';
import { Categories } from './interfaces/Categories';
import ErrorEmbed from './errors/ErrorEmbed';
import { Mongo } from './functions/Mongoose';
import { DatabaseManager } from './managers/DatabaseManager';
import { MusicManager } from './managers/MusicManager';

class Ultimatum extends Client {
	public commands: Collection<string | string[], Command> = new Collection();
	public events: Collection<string | string[], Event> = new Collection();
	public aliases: Collection<string, Command> = new Collection();
	public categories: Collection<
		string | string[],
		Categories
	> = new Collection();
	public description: Collection<string, Command> = new Collection();
	//working tmrw
	public client: Client = this;
	public DBManager: DatabaseManager;
	public MusicManager: MusicManager;
	public database: Mongo;
	public ErrorEmbed = ErrorEmbed;
	public constructor() {
		super({
			fetchAllMembers: true,
			retryLimit: Number.POSITIVE_INFINITY,
		});
	}
	public async StartClient(config: string | undefined): Promise<void> {
		this.MusicManager = new MusicManager();
		this.database = new Mongo();
		this.database.Init(process.env.MONGO_DB_PASSWORD);
		glob(`./dist/handlers/commands/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const CommandPath = f.split('./dist/handlers/commands/')[1];
					const props = require(`./handlers/commands/${CommandPath}`);
					this.commands.set(props.name, props);
					if (props.category) {
						this.categories.set(props.category, props);
					}
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
		glob(`./dist/handlers/events/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const Event = f.split('./dist/handlers/events')[1];
					const props: Event = require(`./handlers/events/${Event}`);
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
