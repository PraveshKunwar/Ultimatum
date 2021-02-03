import { Message } from 'discord.js';
import Bot from '../config/Bot';

export interface Run {
	(client: Bot, message: Message, args: string[]): Promise<void>;
}

export interface Cmd {
	Name: string;
	category?: string;
	run: Run;
}
