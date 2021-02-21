import mongoose from 'mongoose';

const SuggestSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	SuggestionChannel: Number,
	GuildId: Number,
});

const Suggestions = mongoose.model('suggestions', SuggestSchema);
export default Suggestions;
