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
		client.MusicManager.stop(message);
	}
};

export const name: string = 'stop';
export const category: string = 'music';
export const desc: string = 'Stop playing some music from queue..';
export const perms: string[] = ['SPEAK', 'CONNECT'];
