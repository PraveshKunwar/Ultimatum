import { Run } from '../../interfaces/Command';
import WarnModel from '../../models/warns.model';
import GuildModel from '../../models/guild.model';
import { WarnType } from '../../interfaces/WarnInterface';
import { MessageEmbed, TextChannel } from 'discord.js';
import moment from 'moment';
import mongoose from 'mongoose';

export const run: Run = async (client, message, args, prefix) => {
	const mod: Promise<any> = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	const user = message.mentions.users.first();
	const warn = user
		? args.join(' ').replace(user.id, '').replace('<@!>', '').trim()
		: 'No Warn';
	if (!user) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify someone for me to set a warn for: \n\n 🔰 **${prefix}warn> @user#123 <warn>** ${client.OneQuote(
					'Adds a warn for user#123.'
				)}`,
				client,
				message
			)
		);
	} else if (user && !warn) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure to add a warn for the user.`,
				client,
				message
			)
		);
	} else if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you have the following permissions: \n\n 🔰${client.OneQuote(
					`MANAGE_MESSAGES`
				)}`,
				client,
				message
			)
		);
	} else if (warn.length > 2000) {
		client.ErrorEmbed(
			'➤ Please make sure to add a warn for the user, and that the warn does not exceed 2000 characters.',
			client,
			message
		);
	} else if (
		message.member.hasPermission('MANAGE_MESSAGES') &&
		user &&
		warn &&
		warn.length < 2000
	) {
		client.DatabaseManager.findOne(
			{ UserId: user.id, GuildId: message.guild.id },
			WarnModel
		).then((res: WarnType) => {
			//continue later
		});
	}
};

export const name: string = 'warn';
export const category: string = 'moderation';
export const desc: string = 'Warn a user';
export const perms: string[] = ['MANAGE_MESSAGES'];
