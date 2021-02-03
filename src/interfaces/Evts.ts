import { Message } from 'discord.js';
import Bot from '../config/Bot';

export interface Run {
	(client: Bot, ...args: any[]): Promise<void>;
}

export interface Evt {
	name: string;
	category?: string;
	run: Run;
}
