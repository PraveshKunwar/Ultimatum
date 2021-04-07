import { BotName } from '../Client';

export interface Run {
	(client: BotName, ...args: unknown[]): Promise<unknown>;
}

export interface Event {
	name: string;
	run: Run;
}
