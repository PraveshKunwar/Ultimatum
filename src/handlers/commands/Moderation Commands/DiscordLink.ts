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
	if (
		link === 'on' &&
		message.member.hasPermission('MANAGE_MESSAGES') &&
		message.guild.me.hasPermission('MANAGE_MESSAGES')
	) {
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ DiscordLink: true }
		).then((res) => {
			const OnEmbed = new MessageEmbed()
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setDescription(
					`🔰 **Discord invite link banner turned on.** By: ${client.OneQuote(
						message.author.username
					)}`
				)
				.setColor('RANDOM')
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag} • Created by: PraveshK`,
					message.author.displayAvatarURL()
				);
			message.channel.send(OnEmbed);
		});
	} else if (
		link === 'off' &&
		message.member.hasPermission('MANAGE_MESSAGES') &&
		message.guild.me.hasPermission('MANAGE_MESSAGES')
	) {
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ DiscordLink: false }
		).then((res) => {
			const OffEmbed = new MessageEmbed()
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setDescription(
					`🔰 **Discord invite link banner turned off.** By: ${client.OneQuote(
						message.author.username
					)}`
				)
				.setColor(Colors.error)
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag} • Created by: PraveshK`,
					message.author.displayAvatarURL()
				);
			message.channel.send(OffEmbed);
		});
	}
};

export const name: string = 'discord-link';
export const category: string = 'moderation';
export const desc: string = 'Delete discord invite links immediatly.';
