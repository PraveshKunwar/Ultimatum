import { Message, VoiceConnection } from 'discord.js';
import { Ultimatum } from '../client';
import ytdl from 'ytdl-core';

class MusicManager {
	public client: Ultimatum;
	public queue: Map<string, object>;
	public dispatcher: VoiceConnection;
	public thing: {};
	public play(msg: Message, songs: { url: string; title: string }) {
		this.queue = this.client.queue;
		const guildQueue: any = this.queue.get(msg.guild.id);
		if (!songs) {
			guildQueue.vc.leave();
			this.queue.delete(msg.guild.id);
		}
		this.dispatcher = guildQueue.connection;

		this.dispatcher
			.play(ytdl(songs[0].url))
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
