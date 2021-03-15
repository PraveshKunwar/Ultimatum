import { Message, MessageEmbed, VoiceConnection } from 'discord.js';
import Colors from '../../../util/Colors';
import { Run } from '../../../interfaces/Command';
import { MusicTypes } from '../../../interfaces/Music';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
//@ts-ignore
export const run: Run = async (client, message, args, prefix) => {
	const searchFor = args.join(' ');
	const queue = client.queue;
	const GuildQueue: any = client.queue.get(message.guild.id);
	const vcmember = message.member.voice.channel;
	if (
		!message.guild.me.hasPermission('SPEAK') ||
		!message.guild.me.hasPermission('CONNECT')
	) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`CONNECT || SPEAK`
				)}`,
				client,
				message
			)
		);
	}
	if (!searchFor) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure that you are using the command correctly. \n\n 🔰 **${prefix}play songname** ${client.OneQuote(
					'Will play the desired song name.'
				)}`,
				client,
				message
			)
		);
	}
	if (!vcmember) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure that you are in a voice channel in order for me to join.`,
				client,
				message
			)
		);
	}
};

export const name: string = 'play';
export const category: string = 'music';
export const desc: string = 'Play some music with the bot.';
