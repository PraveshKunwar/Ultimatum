import mongoose from 'mongoose';

interface Warns {
	userId: number;
	guildId: number;
}

const GuildJoin = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	GuildId: Number,
	GuildName: String,
	GuildMembers: Number,
	GuildChannels: Number,
	GuildRoles: Number,
	GuildRegion: String,
	GuildOwner: String,
	createdAt: Date,
	icon: String || null,
	DiscordLink: Boolean || null,
	ModChannel: Number || null,
	ModChannelName: String || null,
	BadWords: Boolean || null,
	Warns:
		[
			{
				userId: Number,
				GuildId: Number,
			},
		] || null,
});

const GuildModel = mongoose.model('guilds', GuildJoin);
export default GuildModel;
