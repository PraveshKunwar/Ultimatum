import { Run } from '../../../interfaces/Command';
import ErrorEmbed from '../../../errors/ErrorEmbed';
import BlockQuote from '../../../util/BlockQuote';
import mongoose, { AggregationCursor } from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import ytdl from 'ytdl-core';

export const run: Run = async (client, message, args, prefix) => {
	console.log(args);
};

export const name: string = 'play';
