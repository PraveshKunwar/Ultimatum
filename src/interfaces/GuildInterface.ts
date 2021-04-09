import { Document } from 'mongoose';

export interface GuildType extends Document {
	Prefix: string;
	GuildId: string;
	GuildName: string;
	GuildMembers: number;
	GuildChannels: number;
	GuildRoles: number;
	GuildRegion: string;
	GuildOwner: string;
	createdAt: Date;
	icon: string | null;
	DiscordLink: boolean | null;
	ModChannel: string | null;
	ModChannelName: string | null;
	BadWords: boolean | null;
	Warns:
		| [
				{
					userId: number;
					GuildId: number;
				}
		  ]
		| null;
}
