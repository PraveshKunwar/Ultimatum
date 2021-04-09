import { Document } from 'mongoose';

export interface WarnArray {
	warnedAt?: Date;
	warn: string;
	warnedBy?: string;
	warnedUser?: string;
}

export interface WarnType extends Document {
	UserId: string;
	GuildId: string;
	Warns: WarnArray[];
}
