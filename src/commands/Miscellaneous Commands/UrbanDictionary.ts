import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import { Run } from '../../interfaces/Command';
import axios, { AxiosResponse } from 'axios';
import moment from 'moment';

export const run: Run = async (client, message, args) => {
	const search = args;
	if (!search) {
		message.channel.send(
			client.ErrorEmbed(
				'**➤ Please make sure you specify something for me to search.**',
				client,
				message
			)
		);
	}
	if (search) {
		axios
			.get(
				`http://api.urbandictionary.com/v0/define?term=${search.join('%20')}`
			)
			.then((res: AxiosResponse) => {
				if (res.data.list[0]) {
					const ResultEmbed = new MessageEmbed()
						.setColor('RANDOM')
						.setTimestamp()
						.setTitle('📚 Urban Dictionary')
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setThumbnail(res.data.avatar_url)
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Urban dictionary results displayed for **${search}**.`
						)
						.addFields(
							{
								name: '⭐ Definition',
								value: res.data.list[0].definition,
								inline: true,
							},
							{
								name: '⭐ Example',
								value: res.data.list[0].example
									? res.data.list[0].example
									: 'No example!',
								inline: true,
							},
							{
								name: '⭐ Created at',
								value: res.data.list[0].written_on
									? moment(res.data.list[0].written_on).format(
											'MMMM Do YYYY, h:mm:ss a'
									  )
									: 'No date!',
								inline: true,
							},
							{
								name: '👍 Thumbs up',
								value: res.data.list[0].thumbs_up,
								inline: true,
							},
							{
								name: '👎 Thumbs down',
								value: res.data.list[0].thumbs_down,
								inline: true,
							}
						);
					message.channel.send(ResultEmbed).then(async (msg) => {
						await msg.react('👍');
						await msg.react('👎');
					});
				} else if (res.data.list.length === 0) {
					message.channel.send(
						client.ErrorEmbed(
							`➤ Could not search for **${search}.**`,
							client,
							message
						)
					);
				}
			});
	}
};

export const name: string = 'urban';
export const category: string = 'misc';
export const desc: string = 'Search something on urban dictionary.';
