export interface GuildType {
	GuildId: number;
	GuildName: string;
	GuildMembers: number;
	GuildChannels: number;
	GuildRoles: number;
	GuildRegion: string;
	GuildOwner: string;
	createdAt: Date;
	icon: string | null;
	DiscordLink: boolean | null;
	ModChannel: number | null;
	ModChannelName: string | null;
	BadWords: boolean | null;
}
