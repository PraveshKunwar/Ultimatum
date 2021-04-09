import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { inspect } from 'util';

export const run: Run = async (client, message, args) => {
	const evaluation = args.join(' ');
	if (message.member?.id !== '391364111331622912') return;
	if (!evaluation) {
		const Error = client.ErrorEmbed(
			`**➤ Write something for me to evaluate.**`,
			client,
			message
		);
		message.channel.send(Error);
	}
	let evaled;
	const start = process.hrtime();
	const stop = process.hrtime(start);
	if (evaluation.includes('process') || evaluation.includes('process.exit()')) {
		const Error = client.ErrorEmbed(
			`**➤ Cannot exit process.**`,
			client,
			message
		);
		message.channel.send(Error);
	}
	if (evaluation && message.member?.id === '391364111331622912') {
		try {
			evaled = eval(evaluation);
			const result = client.BlockQuote(
				`${inspect(evaled, { depth: 0 })}`,
				'js'
			);
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
				.setColor('#333')
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag} • Created by: PraveshK`,
					message.author.displayAvatarURL()
				);
			message.channel.send(EvalEmbed);
		} catch (e) {
			if (e) {
				const DeletedEmbed = new MessageEmbed()
					.setColor('#333')
					.setDescription(`❯ ${e}`)
					.setFooter('\u3000'.repeat(10));;
				message.channel
					.send(DeletedEmbed)
					.then(async (msg) => await msg.delete({ timeout: 5000 }));
			}
		}
	}
};

export const name: string = 'eval';
export const category: string = 'owner';
export const aliases: string[] = ['e', 'evaluate'];
export const desc: string = 'Evaluate string.';
export const perms: string[] = ['BOT_OWNER'];
