import { Run } from '../../interfaces/Event';
import mongoose from 'mongoose';
import GuildModel from '../../models/GuildJoin';

export const run: Run = async (client, message, guild) => {
	const GuildJoin = new GuildModel({
		_id: mongoose.Types.ObjectId(),
		GuildId: guild?.id,
		GuildName: guild?.name,
		GuildMembers: guild?.memberCount,
		GuildChannels: guild?.channels.cache.size,
		GuildOwner: guild?.owner?.user.username,
	});
	GuildJoin.save()
		.then((res) => {
			console.log(res);
		})
		.catch((err) => console.log(err));
	return console.log(`Joined new guild: ${guild?.name}`);
};

export const name: string = 'guildCreate';
