import { Run } from '../../interfaces/Command';
import { Message, MessageEmbed } from 'discord.js';

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
		(message.member.voice.channel && currentQueue !== undefined) ||
		null
	) {
		let queue = `**Current Queue (Requested By: ${message.author.tag})**\n\n `;
		for (let i = 0; i < currentQueue.songs.length; i++) {
			queue += `${i} - **[${currentQueue.songs[i].title}](${currentQueue.songs[i].url})** - ${currentQueue.songs[i].timestamp}\n`;
		}
		const DC = new MessageEmbed()
			.setColor('#333')
			.setTimestamp()
			.setThumbnail(currentQueue.songs[0].img)
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			)
			.setDescription(queue);
		message.channel.send(DC);
	}

};

export const name: string = 'queue';
export const category: string = 'music';
export const desc: string = 'Get the current queue from the voice channel.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
