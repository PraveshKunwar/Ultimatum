import { Ultimatum } from '../discord';
import { Guild, Message } from 'discord.js';

export interface Run {
	(client: Ultimatum, message: Message, ...args: any[]): Promise<void>;
}

export interface Event {
	name: string;
	run: Run;
}
