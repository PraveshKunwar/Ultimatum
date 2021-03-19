import { Run } from '../../interfaces/Command';
import GuildModel from '../../models/GuildModel';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';

export const run: Run = async (client, message, args, prefix) => {
	const channel = message.mentions.channels.first();
	if (!channel) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you are using the command correctly. \n\n 🔰 **${prefix}<${aliases.join(
					' | '
				)}> #channelName** `,
				client,
				message
			)
		);
	} else if (
		!message.member.hasPermission('MANAGE_CHANNELS') ||
		!message.guild.me.hasPermission('MANAGE_CHANNELS')
	) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`MANAGE_CHANNELS`
				)}`,
				client,
				message
			)
		);
	}
	if (
		channel &&
		message.member.hasPermission('MANAGE_CHANNELS') &&
		message.guild.me.hasPermission('MANAGE_CHANNELS')
	) {
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ ModChannel: channel.id }
		);
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ ModChannelName: channel.name }
		).then((res) => {
			const SetEmbed = new MessageEmbed()
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setDescription(
					`🔰 **Mod channel updated: ${client.OneQuote(
						channel.name
					)} is now the mod channel.** By: ${client.OneQuote(
						message.author.tag
					)}`
				)
				.setColor('#333')
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag} • Created by: PraveshK`,
					message.author.displayAvatarURL()
				);
			message.channel.send(SetEmbed);
		});
	}
};

export const name: string = 'mod-set';
export const aliases: string[] = ['mod-channel', 'mod-change'];
export const category: string = 'moderation';
export const desc: string = 'Delete discord invite links immediatly.';
export const perms: string[] = ['MANAGE_CHANNELS'];
