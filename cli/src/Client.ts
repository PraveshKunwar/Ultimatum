import { Client, Collection, Intents } from 'discord.js';
import { Command } from './interfaces/Command';
import { Event } from './interfaces/Event';
import glob from 'glob';

// install all the packages by doing
// npm i glob discord.js typescript --save
// after completing a command or updating, please make sure to run 'npm run build'
// to start the bot, type npm start.
// have fun, make sure to head over to index.ts to copy and paste your token. Enjoy!
// Any issues? - Create an issue on this Github Repo.

class BotName extends Client {
	public Commands = new Collection<string, Command>();
	public Events = new Collection<string, Event>();
	public Aliases: Collection<string, Command> = new Collection();
	public constructor() {
		super({
			disableMentions: 'none',
			ws: {
				intents: Intents.ALL,
			},
			partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],
		});
	}
	public init(token: string) {
		this.login(token);
		if (!token) {
			process.exit(1);
		}
		glob(`./dist/commands/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const CommandPath = f.split('./dist/commands/')[1];
					const props = require(`./commands/${CommandPath}`);
					this.Commands.set(props.name, props);

					if (props.aliases) {
						props.aliases.map((alias: string) => {
							this.Aliases.set(alias, props);
						});
					}
				}
			});
		});
		glob(`./dist/events/**/*{.js,.ts}`, (err, files) => {
			err ? console.log(err) : false;
			files.map(async (f) => {
				if (f.endsWith('.js') || f.match(/.*\.js$/)) {
					const Event = f.split('./dist/events')[1];
					const props: Event = require(`./events/${Event}`);
					this.Events.set(props.name, props);
					this.on(props.name, props.run.bind(null, this));
				}
			});
		});
	}
}

export { BotName };
