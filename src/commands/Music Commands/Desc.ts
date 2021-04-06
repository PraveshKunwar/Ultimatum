import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args) => {
	const currentQueue = client.MusicManager.getQueue(message);

	if (!message.member.voice.channel) {
		message.channel.send(
			client.ErrorEmbed(
				`➤  Please make sure you are connected to a voice channel. `,
				client,
				message
			)
		);
	}
	if ((message.member.voice.channel && currentQueue === undefined) || null) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ There are no current songs playing.`,
				client,
				message
			)
		);
	} else if (
		!message.member?.hasPermission('CONNECT') ||
		!message.member?.hasPermission('SPEAK') ||
		!message.guild?.me?.hasPermission('CONNECT') ||
		!message.guild?.me?.hasPermission('SPEAK')
	) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`SPEAK | CONNECT`
				)}`,
				client,
				message
			)
		);
	} else if (
		(message.member.voice.channel && currentQueue !== undefined) ||
		null
	) {
		const results: any = currentQueue.songs[0];
		const PlayingEmbed = new MessageEmbed()
			.setDescription(`➤ Info for: **${results.title}**`)
			.setThumbnail(results.img)
			.addFields(
				{
					name: 'Url',
					value: `[Link](${results.url})`,
					inline: true,
				},
				{
					name: 'Description',
					value: results.desc ? results.desc : 'No description!',
					inline: true,
				},
				{
					name: 'Timestamp',
					value: results.timestamp
						? results.timestamp
						: 'No timestamp provided. May be a livestream you are trying to listen!',
					inline: true,
				},
				{
					name: 'Views',
					value: results.views ? results.views : "Couldn't load views.",
					inline: true,
				},
				{
					name: 'Thumbnail',
					value: results.img ? `[Link](${results.img})` : 'No image!',
					inline: true,
				}
			)
			.setColor('#333')
			.setFooter('\u3000'.repeat(10));
		currentQueue.channel.send(PlayingEmbed);
	}
};

export const name: string = 'desc';
export const category: string = 'music';
export const desc: string = 'Get description on a current track.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
