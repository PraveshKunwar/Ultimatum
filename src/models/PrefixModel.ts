import mongoose from 'mongoose';

const PrefixModel = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	prefix: String || Number,
	GuildId: Number,
});

const Prefix = mongoose.model('prefixes', PrefixModel);
export default Prefix;
