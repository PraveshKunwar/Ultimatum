import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { shuffleElements } from '../../utils/utils';

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
		if (currentQueue.songs.length <= 1) {
			message.channel.send(
				client.ErrorEmbed(
					`➤ Cannot shuffle music since there is only one song playing. Add more songs to shuffle the queue.`,
					client,
					message
				)
			);
		} else if (currentQueue.songs.length > 1) {
			currentQueue.songs = shuffleElements(currentQueue.songs);
			let queue = `**New Queue (Shuffled By: ${message.author.tag})**\n\n `;
			for (let i = 0; i < currentQueue.songs.length; i++) {
				queue += `${i} - **[${currentQueue.songs[i].title}](${currentQueue.songs[i].url})** - ${currentQueue.songs[i].timestamp}\n`;
			}
			const DC = new MessageEmbed()
				.setColor('#333')
				.setThumbnail(currentQueue.songs[0].image)
				.setFooter('\u3000'.repeat(10))
				.setDescription(queue);
			message.channel.send(DC);
		}
	}
};

export const name: string = 'shuffle';
export const category: string = 'music';
export const desc: string = 'Shuffle some music from the current queue.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
