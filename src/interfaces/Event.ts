import { Ultimatum } from '../client';
import { Guild, Message } from 'discord.js';

export interface Run {
	(client: Ultimatum, ...args: unknown[]): Promise<unknown>;
}

export interface Event {
	name: string;
	run: Run;
}
