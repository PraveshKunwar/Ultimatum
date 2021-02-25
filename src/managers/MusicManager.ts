import { Ultimatum } from '../discord';
import ytdl from 'ytdl-core';

class MusicManager {
	public queue = new Map();
	public async play(url: string): Promise<void> {
		const info = await ytdl.getInfo(url);
	}
}

export { MusicManager };
