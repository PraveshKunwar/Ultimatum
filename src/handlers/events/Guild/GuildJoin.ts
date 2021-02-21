import { Run } from '../../../interfaces/Event';
import mongoose from 'mongoose';
import GuildModel from '../../../models/GuildJoin';
import { Guild } from 'discord.js';

export const run: Run = async (client, guild: Guild) => {
	return console.log(`Joined new guild: ${guild?.name}`);
};

export const name: string = 'guildCreate';
