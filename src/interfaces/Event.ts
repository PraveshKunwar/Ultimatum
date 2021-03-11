import { Ultimatum } from '../client';
import { Guild, Message } from 'discord.js';

export interface Run {
	(client: Ultimatum, ...args: unknown[]): Promise<void>;
}

export interface Event {
	name: string;
	run: Run;
}
