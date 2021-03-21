import { Message, VoiceConnection } from 'discord.js';
import { Ultimatum } from '../client';
import ytdl from 'ytdl-core';

class MusicManager {
	public queue: Map<string, object> = new Map();
	public client: Ultimatum;
	public dispatcher: VoiceConnection;
	public thing: {};
	public play(msg: Message, songs) {
		const guildQueue: any = this.queue.get(msg.guild.id);
		if (!songs) {
			guildQueue.vc.leave();
			this.queue.delete(msg.guild.id);
		}
		this.dispatcher = guildQueue.connection;

		this.dispatcher
			//@ts-ignore
			.play(ytdl(songs.url))
			.on('finish', () => {
				guildQueue.songs.shift();
				this.play(msg, guildQueue.songs[0]);
			})
			.on('error', (err: Error) => {
				console.log(err);
			});
		guildQueue.channel.send(`Started playing: **${songs.title}**`);
	}
}

export { MusicManager };
