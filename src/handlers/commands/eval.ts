import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';

export const run: Run = async (client, message, args) => {
	const evaluation = args.join(' ');
	if (!evaluation || message.member?.id !== '391364111331622912') {
		const Error = ErrorEmbed(
			`Please make sure you have the following requirements!
            ${BlockQuote(`
            1. Must be OWNER of bot (PraveshK).
            `)}
            `,
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
				value: `${BlockQuote(
					`
        Input = ${evaluation}
        Result: ${eval(evaluation)}
        `,
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
