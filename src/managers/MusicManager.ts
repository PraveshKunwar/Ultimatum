import { Ultimatum } from '../discord';
import ytdl from 'ytdl-core';
import { Guild, Message, VoiceChannel, VoiceConnection } from 'discord.js';
import { MusicTypes } from '../interfaces/MusicTypes';
const yts = require('yt-search');

class MusicManager {
	public queue = new Map();
	public message: Message;
	public client: Ultimatum;
	public constructor() {
		const QueueObject = {
			//	currentChannel: this.message.channel,
			connection: false,
			songs: [],
			volume: 5,
			playing: true,
		};
	}
	public async play(vid: string): Promise<void> {}
}
export { MusicManager };

const add = <T extends number>(x: T, y: T) => {
	return x + y;
};
