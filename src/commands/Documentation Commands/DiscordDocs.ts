import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

export const run: Run = async (client, message, args, prefix) => {
	const query = args.join(' ');
	if (!query) {
		const Error = client.ErrorEmbed(
			'**➤ Please make sure you specify something for me to search.**',
			client,
			message
		);
		message.channel.send(Error);
	} else {
		axios
			.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`)
			.then((res: AxiosResponse) => {
				const DjsEmbed = new MessageEmbed()
					.setColor('#333')
					.setAuthor(
						res.data.author.name,
						res.data.author.icon_url,
						res.data.author.url
					)
					.setDescription(res.data.description)
					.setURL(res.data.url);

				res.data.fields ? DjsEmbed.addFields(res.data.fields) : '';
				message.channel.send(DjsEmbed);
			});
	}
};
export const name: string = 'djs';
export const category: string = 'docs';
export const desc: string =
	'Get data from the official Discord.JS documentation.';
