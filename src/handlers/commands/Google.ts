import ErrorEmbed from '../../errors/ErrorEmbed';
import { MessageEmbed } from 'discord.js';
import BlockQuote from '../../util/BlockQuote';
import Colors from '../../util/Colors';
import { Run } from '../../interfaces/Command';

export const run: Run = async (client, message, args, prefix) => {
	const SearchParams: string | number = args.join('+');
	if (!SearchParams) {
		const Error = ErrorEmbed(
			`Please specify some params for me to search!
    **Examples:**
    ${BlockQuote(
			`
    ${prefix}Google what's the weather today?
    ${prefix}Google latest news!
    `
		)}
    `,
			client,
			message
		);
		message.channel.send(Error);
	} else {
		const GoogleLink = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('↠ Google Search:')
			.setDescription(
				`↠ [🔗Link](http://www.google.com/search?q=${SearchParams})`
			)
			.setColor(Colors.successful)
			.setTimestamp()
			.setFooter(
				`↠↠ User: ${message.author?.tag}`,
				message.author.displayAvatarURL()
			);
		message.channel.send(GoogleLink);
	}
};

export const name: string = 'Google';
