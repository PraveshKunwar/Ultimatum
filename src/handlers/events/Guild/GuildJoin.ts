import { Run } from '../../../interfaces/Event';
import * as mongoose from 'mongoose';
import GuildModel from '../../../models/GuildModel';
import { Guild } from 'discord.js';

export const run: Run = async (client, guild: Guild) => {
	if (guild.available) {
		const check = await GuildModel.findOne({
			GuildId: guild?.id,
		});
		if (!check) {
			const NewGuild = new GuildModel({
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
			NewGuild.save()
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	}
};

export const name: string = 'guildCreate';
