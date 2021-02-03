import { Run } from '../../interfaces/Evts';
import { Cmd } from '../../interfaces/Cmds';
import { Message } from 'discord.js';

export const run: Run = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith('ult!')
	)
		return;
	const args: string[] = message.content
		.slice('ult!'.length)
		.trim()
		.split(/ +/g);
	const cmd: string = args.shift();
	const command: Cmd = client.Commands.get(cmd);
	if (!command) return;
	command
		.run(client, message, args)
		.catch((rsn: any) => message.channel.send(`Error: ${rsn}`));
};

export const Name: string = 'message';
