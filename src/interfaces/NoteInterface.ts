import { Document } from 'mongoose';
export interface NoteType extends Document {
	UserId: string;
	GuildId: string;
	note: string;
}
