import { Run } from '../../../interfaces/Command';
import BlockQuote from '../../../util/BlockQuote';
import mongoose from 'mongoose';
import { MessageAttachment, MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import ytdl from 'ytdl-core';

export const run: Run = async (client, message, args, prefix) => {
	console.log(args);
	const vc = message.member.voice.channel;
	const song: string = args.join(' ');
	const perms: boolean =
		!message.guild.me.hasPermission('CONNECT') ||
		!message.guild.me.hasPermission('SPEAK');
	if (!vc || perms || song) {
		const Error = client.ErrorEmbed(
			`
		Please make sure you meet the following requirements to use this command:
		${BlockQuote(`
		1. Must have permission CONNECT.
		2. Must have permission SPEAK.
		3. You must be in a voice channel for me to join.
		4. Must use the command correctly: ${prefix}play title of song
		`)}
		`,
			client,
			message
		);
		message.channel.send(Error);
	} else {
		client.MusicManager.play(song);
	}
};

export const name: string = 'play';
