import { Run } from '../../../interfaces/Command';
import GuildModel from '../../../models/GuildModel';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';

export const run: Run = async (client, message, args, prefix) => {
	const link = args[0];
	if (!link) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure that you are using the command correctly. \n\n 🔰 **${prefix}discord-link on** ${client.OneQuote(
					'Turns the discord link banner on.'
				)}\n
                        🔰 **${prefix}discord-link off** ${client.OneQuote(
					'Turns the discord link banner off.'
				)}
                        `,
				client,
				message
			)
		);
	} else if (
		!message.member.hasPermission('MANAGE_MESSAGES') ||
		!message.guild.me.hasPermission('MANAGE_MESSAGES')
	) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`MANAGE_MESSAGES`
				)}`,
				client,
				message
			)
		);
	}
	if (link === 'on') {
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ DiscordLink: true }
		).then((res) => {
			message.channel.send('updated');
		});
	}
};

export const name: string = 'discord-link';
export const category: string = 'moderation';
export const desc: string = 'Delete discord invite links immediatly.';
