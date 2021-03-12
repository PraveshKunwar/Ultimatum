import { Run } from '../../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import { inspect } from 'util';

export const run: Run = async (client, message, args) => {
	const evaluation = args.join(' ');
	let evaled;
	const start = process.hrtime();
	const stop = process.hrtime(start);
	evaled = eval(evaluation);
	if (!evaluation || message.member?.id !== '391364111331622912') {
		const Error = client.ErrorEmbed(
			`**➤ Cannot use this command. Not owner of bot.**`,
			client,
			message
		);
		message.channel.send(Error);
	} else if (evaluation && message.member?.id === '391364111331622912') {
		const result = client.BlockQuote(`${inspect(evaled, { depth: 0 })}`, 'js');
		const taken = client.BlockQuote(
			`${(stop[0] * 1e9 + stop[1]) / 1e6}ms taken!`,
			'js'
		);
		const EvalEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setDescription(
				`
			**Result:**\n${result}\n**Time Taken:**\n${taken}
			`
			)
			.setColor("RANDOM")
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(EvalEmbed);
	}
};

export const name: string = 'eval';
export const category: string = 'owner';
export const aliases: string[] = ['e', 'evaluate'];
export const desc: string = 'Evaluate string.';
