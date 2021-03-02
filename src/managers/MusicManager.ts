import { Ultimatum } from '../discord';
import ytdl from 'ytdl-core';
import { Guild, Message, VoiceChannel, VoiceConnection } from 'discord.js';
import { MusicTypes } from '../interfaces/MusicTypes';
const yts = require('yt-search');

class MusicManager {
	public queue = new Map();
	public message: Message;
	public client: Ultimatum;
	public vc: VoiceChannel;
	public constructor() {
		const QueueObject = {
			currentChannel: this.message.channel,
			currentVc: this.vc,
			connection: false,
			songs: [],
			volume: 5,
			playing: true,
		};
		this.queue.set(this.message.guild.id, QueueObject);
	}
	public async play(vid: string, guild?: Guild): Promise<void> {
		const search: MusicTypes = await yts(vid);
		//first data provided by user :)
		const queue: any = this.queue.get(guild.id);
		const songs: any[] | unknown[] = queue.songs;
		const SearchResults = {
			title: search.all[0].title,
			url: search.all[0].url,
			desc: search.all[0].desc,
			img: search.all[0].image,
			timestamp: search.all[0].timestamp,
			views: search.all[0].views,
		};
		songs.push(SearchResults);
		this.vc = this.message.member.voice.channel;
		if (!this.vc) {
			//check later;
		}
		const connection: VoiceConnection = await this.vc.join();
	}
}

export { MusicManager };
