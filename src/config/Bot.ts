import {
	Client,
	Message,
	Intents,
	Collection,
	MessageEmbedOptions,
	MessageEmbed,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import consola, { Consola } from 'consola';

import { Cmd } from '../interfaces/Cmds';
import { Evt } from '../interfaces/Evts';
import { Token } from '../interfaces/Token';

const GlobalPromise = promisify(glob);

class Bot extends Client {
	public Logger: Consola = consola;
	public Commands: Collection<string, Cmd> = new Collection();
	public Events: Collection<string, Evt> = new Collection();
	public config: Token;
	public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({ ...options, color: 'RANDOM' }).setFooter(
			`${message.author.tag}`,
			`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`
		);
	}
	public constructor() {
		super({
			disableMentions: 'everyone',
			fetchAllMembers: true,
		});
	}
	public async start(config: Token): Promise<void> {
		this.config = config;
		this.login(config.token);
		const cmdFiles: string[] = await GlobalPromise(
			`${__dirname}/../commands/**/*{.ts,.js}`
		);
		cmdFiles.map(async (value: string) => {
			const file: Cmd = await import(value);
			this.Commands.set(file.name, file);
		});
		const evtFiles: string[] = await GlobalPromise(
			`${__dirname}/../events/**/*{.ts,.js}`
		);
		evtFiles.map(async (value: string) => {
			const file: Evt = await import(value);
			this.Events.set(file.name, file);
			this.on(file.name, file.run.bind(null, this));
		});
	}
}

export default Bot;
