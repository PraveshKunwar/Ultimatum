import { Ultimatum } from '../client';
import { Message } from 'discord.js';

export interface Run {
	(
		client: Ultimatum,
		message: Message,
		args: string[],
		prefix?: string | number
	): Promise<unknown>;
}

export interface Command {
	name: string;
	category?: string;
	run: Run;
	desc?: string;
	aliases?: string[];
	perms?: string[];
}
