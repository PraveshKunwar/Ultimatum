import { Role } from 'discord.js';
import mongoose from 'mongoose';

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
});

const GuildModel = mongoose.model('guilds', GuildJoin);
export default GuildModel;