import { Run } from '../../interfaces/Command';
import { Message, MessageEmbed, VoiceConnection } from 'discord.js';
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import { MusicInterface } from '../../interfaces/MusicInterface';
import { CallTracker } from 'node:assert';

export const run: Run = async (client, message, args, prefix) => {
	const searchFor = args.join(' ');
	const search: MusicInterface = searchFor ? await yts(searchFor) : false;
	const globQueue = client.queue;
	const guildQueue: any | object = globQueue.get(message.guild.id);
	const voice = message.member.voice.channel;
	const QueueObj = {
		channel: message.channel,
		vc: voice,
		connection: null,
		songs: [],
		volume: 5,
		playing: true,
	};

	if (!voice) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤  Please make sure you are connected to a voice channel. `,
				client,
				message
			)
		);
	} else if (voice && !searchFor) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤  Please make sure you specify something for me to play. `,
				client,
				message
			)
		);
	} else if (
		searchFor.match(
			/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm
		)
	) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤  Please make sure you specify a video, do not copy and paste YouTube links. You can copy the title of the video. `,
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
	} else if (!guildQueue && voice && searchFor) {
		const results = {
			title: search.all[0].title,
			url: search.all[0].url,
			desc: search.all[0].desc,
			img: search.all[0].image,
			timestamp: search.all[0].timestamp,
			views: search.all[0].views,
		};
		QueueObj.songs.push(results);
		await voice.join().then(async (connection: VoiceConnection) => {
			QueueObj.connection = connection;
			globQueue.set(message.guild.id, QueueObj);
			client.MusicManager.play(message, QueueObj.songs[0]);
		});
	} else if (guildQueue && voice && searchFor) {
		const results = {
			title: search.all[0].title,
			url: search.all[0].url,
			desc: search.all[0].desc,
			img: search.all[0].image,
			timestamp: search.all[0].timestamp,
			views: search.all[0].views,
		};
		guildQueue.songs.push(results);
		const PlayingEmbed = new MessageEmbed()
			.setThumbnail(results.img)
			.setDescription(`➤ **${results.title}** has been added to the queue.`)
			.setColor('#333');

		guildQueue.channel.send(PlayingEmbed);
	}
};
export const name: string = 'play';
export const category: string = 'music';
export const desc: string = 'Play some music from YouTube.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
