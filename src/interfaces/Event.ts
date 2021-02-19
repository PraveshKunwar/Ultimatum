import Ultimatum from '../client/discord';
import { Guild, Message } from 'discord.js';

export interface Run {
	(
		client: typeof Ultimatum,
		message: Message,
		guild?: Guild,
		...args: string[]
	): Promise<void>;
}

export interface Event {
	name: string;
	run: Run;
}
