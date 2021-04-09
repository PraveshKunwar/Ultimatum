import mongoose from 'mongoose';

const Warns = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	UserId: String,
	GuildId: String,
	Warns: Array,
});

const WarnsModel = mongoose.model('warns', Warns);
export default WarnsModel;
