import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import { Run } from '../../interfaces/Command';

export const run: Run = async (client, message, args, prefix) => {
	const SearchParams: string | number = args.join('+');
	if (!SearchParams) {
		const Error = client.ErrorEmbed(
			`**➤ Please specify some params for me to search!** \n\n
    `,
			message
		);
		message.channel.send(Error);
	} else {
		const GoogleLink = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setDescription(
				`**[Link to ${SearchParams}](http://www.google.com/search?q=${SearchParams})**`
			)
			.setColor('#333')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(GoogleLink);
	}
};

export const name: string = 'google';
export const category: string = 'misc';
export const desc: string = 'Google and get a quick link.';
