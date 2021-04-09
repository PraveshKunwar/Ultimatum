import mongoose from 'mongoose';

const GuildJoin = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	Prefix: String || Number,
	GuildId: String,
	GuildName: String,
	GuildMembers: Number,
	GuildChannels: Number,
	GuildRoles: Number,
	GuildRegion: String,
	GuildOwner: String,
	createdAt: Date,
	icon: String || null,
	DiscordLink: Boolean || null,
	ModChannel: String || null,
	ModChannelName: String || null,
	BadWords: Boolean || null,
	Welcome: Boolean,
});

const GuildModel = mongoose.model('guilds', GuildJoin);
export default GuildModel;
