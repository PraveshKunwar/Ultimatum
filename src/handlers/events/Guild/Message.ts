import { Run } from '../../../interfaces/Event';
import { Ultimatum } from '../../../discord';
import * as mongoose from 'mongoose';
import Prefix from '../../../models/PrefixModel';
import { Message } from 'discord.js';

export const run: Run = async (client, message: Message) => {
	const data: any = await Prefix.findOne({
		GuildId: message.guild?.id,
	});
	if (!data) {
		const NewData = new Prefix({
			_id: mongoose.Types.ObjectId(),
			GuildId: message.guild?.id,
			prefix: 'ult!',
		});
		return NewData.save()
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	const prefix = data ? data.prefix : 'ult!';
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
	const command =
		client.commands.get(cmd) || client.aliases
			? client.aliases.get(cmd)
			: client.commands.get(cmd);

	if (!command) return;
	else {
		command.run(client, message, args, prefix);
	}
};

export const name: string = 'message';
