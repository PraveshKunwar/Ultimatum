import { Run } from '../../interfaces/Command';
import { Message, MessageEmbed, VoiceConnection } from 'discord.js';
import Colors from '../../util/Colors';
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import { MusicInterface } from '../../interfaces/MusicInterface';

export const run: Run = async (client, message, args) => {
	const searchFor = args.join(' ');
	const search: MusicInterface = searchFor ? await yts(searchFor) : false;
	const globQueue = client.queue;
	const guildQueue: any = globQueue.get(message.guild.id);
	const voice = message.member.voice.channel;
	const QueueObj = {
		channel: message.channel,
		vc: voice,
		connection: null,
		songs: [],
		volume: 5,
		playing: true,
	};
	const results = {
		title: search.all[0].title,
		url: search.all[0].url,
		desc: search.all[0].desc,
		img: search.all[0].image,
		timestamp: search.all[0].timestamp,
		views: search.all[0].views,
	};
	if (!voice || !searchFor) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you are connected to a voice channel for me to join. Then, make sure you specify something for me to play (results based off YouTube).`,
				client,
				message
			)
		);
	}
	if (
		!message.member?.hasPermission('CONNECT') ||
		!message.member?.hasPermission('SPEAK') ||
		!message.guild?.me?.hasPermission('CONNECT') ||
		!message.guild?.me?.hasPermission('SPEAK')
	) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`SPEAK | CONNECT`
				)}`,
				client,
				message
			)
		);
	}
	if (!guildQueue && voice && searchFor) {
		QueueObj.songs.push(results);
		await voice.join().then(async (connection: VoiceConnection) => {
			QueueObj.connection = connection;
			globQueue.set(message.guild.id, QueueObj);
			//@ts-ignore
			globQueue.get(message.guild.id).connection.play(
				//@ts-ignore
				ytdl(globQueue.get(message.guild.id).songs[0].url, {
					filter: 'audioonly',
				})
			);
		});
	} else if (guildQueue && voice && searchFor) {
		guildQueue.songs.push(results);
		message.channel.send(`${results.title} has been added to the queue`);
	}
};
export const name: string = 'play';
export const category: string = 'music';
export const desc: string = 'Play some music from YouTube.';
export const perms: string[] = ['SPEAK', 'CONNECT'];
