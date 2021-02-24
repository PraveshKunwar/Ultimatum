import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';

export const run: Run = async (client, message, args) => {
	console.log(message.content);
};
