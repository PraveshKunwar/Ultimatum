import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import axios, { AxiosResponse } from 'axios';

export const run: Run = async (client, message, args) => {
	const query = args.join(' ');
	if (!query) {
		message.channel.send(
			client.ErrorEmbed(
				'**➤ Please make sure you specify something for me to search.**',
				client,
				message
			)
		);
	} else {
		axios
			.get(
				`https://developer.mozilla.org/api/v1/search/en-US?q=${encodeURIComponent(
					query
				)}&locale=en-US&highlight=false`
			)
			.then((res: AxiosResponse) => {
				if (res.data.documents.length !== 0) {
					const MDNEmbed = new MessageEmbed()
						.setColor('#333')
						.setTitle(res.data.documents[0].title)
						.setURL(
							`https://developer.mozilla.org/${res.data.documents[0].mdn_url}`
						)
						.setDescription(
							res.data.documents[0].summary.includes('\n')
								? res.data.documents[0].summary.replace('\n', '')
								: res.data.documents[0].summary
						)
						.setTimestamp()
						.setThumbnail(
							'https://avatars.githubusercontent.com/u/7565578?s=280&v=4'
						)
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							client.user.displayAvatarURL()
						);
					message.channel.send(MDNEmbed);
				} else {
					return message.channel.send(
						client.ErrorEmbed(
							`➤ Couldn't find **${query}** on the MDN Docs. Perhpaps, try again?`,
							client,
							message
						)
					);
				}
			});
	}
};
export const name: string = 'mdn';
export const category: string = 'docs';
export const desc: string =
	'Get data from the official Mozilla Developer documentation.';
