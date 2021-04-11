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
	}
	if ((message.member.voice.channel && currentQueue !== undefined) || null) {
		client.MusicManager.resume(message);
	}
};

export const name: string = 'resume';
export const category: string = 'music';
export const desc: string = 'Resume some music from the queue.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
