import { Run } from '../../interfaces/Command';
import { MessageEmbed, MessageReaction, User } from 'discord.js';

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
	}
	if ((message.member.voice.channel && currentQueue !== undefined) || null) {
		if (currentQueue.songs.length <= 1) {
			message.channel.send(
				client.ErrorEmbed(
					`➤ Cannot skip music since there is only one song playing. Add more songs to skip songs throughout queue.`,
					client,
					message
				)
			);
		} else if (currentQueue.songs.length >= 1) {
			client.MusicManager.skip(message);
		}
	}
};

export const name: string = 'skip';
export const category: string = 'music';
export const desc: string = 'Skip to the next music in the queue.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
