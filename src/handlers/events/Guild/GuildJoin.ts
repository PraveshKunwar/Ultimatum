import { Run } from '../../../interfaces/Event';
import * as mongoose from 'mongoose';
import GuildModel from '../../../models/GuildModel';
import { Guild } from 'discord.js';

export const run: Run = async (client, guild: Guild) => {
	if (guild.available) {
		// guild model
		client.DBManager.checkModel('../../../models/GuildModel', {
			_id: mongoose.Types.ObjectId(),
			GuildId: guild?.id,
			GuildName: guild?.name,
			GuildMembers: guild?.memberCount,
			GuildChannels: guild?.channels.cache.size,
			GuildRoles: guild?.roles.cache.size,
			GuildRegion: guild?.region,
			GuildOwner: guild?.owner?.user.username,
			createdAt: guild?.createdAt,
			icon: guild?.iconURL(),
		});
	}
};

export const name: string = 'guildCreate';
