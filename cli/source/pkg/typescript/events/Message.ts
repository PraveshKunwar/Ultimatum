import { Run } from '../interfaces/Event';

import { Message } from 'discord.js';

//@ts-ignore
export const run: Run = async (client, message: Message) => {
	const prefix = '!';
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.startsWith(prefix)
	)
		return;
	const args: string[] | any[] = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd: string = args.shift();
	const command = client.Commands.get(cmd) || client.Aliases.get(cmd);
	if (!command) return;
	else {
		command.run(client, message, args, prefix);
	}
};

export const name: string = 'message';
