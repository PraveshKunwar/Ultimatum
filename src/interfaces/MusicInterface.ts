import { TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';

export interface MusicInterface {
	all: [
		{
			title?: string;
			url?: string;
			desc?: string;
			image?: string;
			timestamp?: string;
			views?: number;
		}
	];
}

export interface GuildQueue {
	channel: TextChannel;
	vc: VoiceChannel;
	connection: VoiceConnection;
	songs: any[];
	volume: number;
	playing: boolean;
}
