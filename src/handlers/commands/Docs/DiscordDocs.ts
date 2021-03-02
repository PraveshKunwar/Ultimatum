import { Run } from '../../../interfaces/Command';
import BlockQuote from '../../../util/BlockQuote';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

export const run: Run = async (client, message, args, prefix) => {
	const query = args.join(' ');
	if (!query) {
		const Error = client.ErrorEmbed(
			`
		Please make sure you use the command correctly!
		${BlockQuote(`
		1. ${prefix}djs ClientUser#setPresence() OR ClientUser.setPresence()
		`)}
		`,
			client,
			message
		);
		message.channel.send(Error);
	} else {
		axios
			.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`)
			.then((res) => {
				const DjsEmbed = new MessageEmbed()
					.setColor(res.data.color)
					.setAuthor(
						res.data.author.name,
						res.data.author.icon_url,
						res.data.author.url
					)
					.setDescription(res.data.description)
					.setURL(res.data.url)
					.addFields(res.data.fields);
				message.channel.send(DjsEmbed);
			});
	}
};
export const name: string = 'djs';
