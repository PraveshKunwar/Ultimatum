import mongoose from 'mongoose';

const GuildJoin = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	GuildId: Number,
	GuildName: String,
	GuildMembers: Number,
	GuildChannels: Number,
	GuildOwner: String,
});

const GuildModel = mongoose.model('guild', GuildJoin);
export default GuildModel;
