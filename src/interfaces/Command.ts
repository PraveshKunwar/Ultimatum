import { Ultimatum } from '../discord';
import { Message } from 'discord.js';

export interface Run {
	(
		client: Ultimatum,
		message: Message,
		args: string[],
		prefix?: string | number
	): Promise<void>;
}

export interface Command {
	name: string;
	category?: string;
	run: Run;
	desc?: object;
	aliases?: string[];
}
