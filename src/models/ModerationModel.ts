import mongoose from 'mongoose';

const ModerationSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	ModerationChannel: Number,
	GuildId: Number,
});

const Moderation = mongoose.model('moderation', ModerationSchema);
export default Moderation;
