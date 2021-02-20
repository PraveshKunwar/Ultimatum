import { Ultimatum } from '../discord';
import { Guild, Message } from 'discord.js';

export interface Run {
	(
		client: Ultimatum,
		message: Message,
		guild?: Guild,
		...args: unknown[]
	): Promise<void>;
}

export interface Event {
	name: string;
	run: Run;
}
