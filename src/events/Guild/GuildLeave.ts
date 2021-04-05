import { Run } from '../../interfaces/Event';
import mongoose from 'mongoose';
import GuildModel from '../../models/guild.model';
import { Guild } from 'discord.js';

export const run: Run = async (client, guild: Guild) => {
	client.DatabaseManager.findOneAndRemove(
		{
			GuildId: guild.id,
		},
		GuildModel
	);
};

export const name: string = 'guildDelete';
