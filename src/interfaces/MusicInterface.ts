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
			author?: {
				name?: string;
			};
		}
	];
}

export interface GuildMusicSongs {
	title?: string;
	url?: string;
	desc?: string;
	image?: string;
	timestamp?: string;
	views?: number;
	author?: {
		name?: string;
	};
}

export interface GuildQueue {
	channel: TextChannel;
	vc: VoiceChannel;
	connection: VoiceConnection;
	songs: GuildMusicSongs[];
	volume: number;
	playing: boolean;
}
