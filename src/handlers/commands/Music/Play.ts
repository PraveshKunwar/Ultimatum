import { Run } from '../../../interfaces/Command';
import BlockQuote from '../../../util/BlockQuote';
import mongoose, { AggregationCursor } from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import ytdl from 'ytdl-core';

export const run: Run = async (client, message, args, prefix) => {
	console.log(args);
	//check perms yah yah
};

export const name: string = 'play';
