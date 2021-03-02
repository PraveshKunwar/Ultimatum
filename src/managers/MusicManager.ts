import { Ultimatum } from '../discord';
import ytdl from 'ytdl-core';
import { Message } from 'discord.js';
import { MusicTypes } from '../interfaces/MusicTypes';
import { fileURLToPath } from 'url';
const yts = require('yt-search');

class MusicManager {
	public queue = new Map();
	public async play(vid: string): Promise<void> {
		const search: MusicTypes = await yts(vid);
		//first data provided by user :)
		const title = search.all[0].title;
		const url = search.all[0].url;
		const desc = search.all[0].desc;
		const img = search.all[0].image;
		const timestamp = search.all[0].timestamp;
		const views = search.all[0].views;
	}
}

export { MusicManager };
