import Ultimatum from '../client/discord';
import { Message } from 'discord.js';

export interface Run {
	(
		client: typeof Ultimatum,
		message: Message,
		args: string[],
		prefix?: string | number
	): Promise<void>;
}

export interface Command {
	name: string;
	category?: string;
	run: Run;
	external?: object;
}
