import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';

export const run: Run = async (client, message, args) => {
	const evaluation = args.join(' ');
	if (!evaluation || message.member?.id !== '391364111331622912') {
		const Error = client.ErrorEmbed(
			`Please make sure you have the following requirements!\n${client.BlockQuote(
				` ➤ 1. Must be OWNER of bot (PraveshK).`
			)}`,
			client,
			message
		);
		message.channel.send(Error);
	} else if (evaluation && message.member?.id === '391364111331622912') {
		const EvalEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('💡 Evaluated!')
			.addFields({
				name: 'Evaluation Result',
				value: `${client.BlockQuote(
					`Input = ${evaluation}\nResult: ${eval(evaluation)} `,
					'js'
				)}`,
				inline: true,
			})
			.setColor(Colors.error)
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
