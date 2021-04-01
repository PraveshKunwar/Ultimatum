import mongoose from 'mongoose';
const Notes = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	UserId: String,
	GuildId: String,
	note: String,
});

const NoteModel = mongoose.model('notes', Notes);
export default NoteModel;
