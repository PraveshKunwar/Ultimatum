import { Run } from '../../interfaces/Command';
import GuildModel from '../../models/GuildModel';
import mongoose from 'mongoose';
import { MessageEmbed, TextChannel } from 'discord.js';
import Colors from '../../utils/utils';
import moment from 'moment';

export const run: Run = async (client, message, args, prefix) => {
	const link = args[0];
	const mod: any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	if (!link) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure that you are using the command correctly. \n\n 🔰 **${prefix}bad-words on** ${client.OneQuote(
					'Turns the bad-words banner on.'
				)}\n
                        🔰 **${prefix}bad-words off** ${client.OneQuote(
					'Turns the bad-words banner off.'
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
			{ BadWords: true }
		).then((res) => {
			const OnEmbed = new MessageEmbed()
				.setDescription(`❯ Bad words banner turned on. 🔞`)
				.setColor('#333')
				.setFooter('\u3000'.repeat(10));
			message.channel.send(OnEmbed);
			mod.then((res) => {
				if (res.ModChannel === null || res.ModChannelName === null) {
					return;
				} else {
					const updated = message.guild.channels.cache.find(
						(n) => n.name === res.ModChannelName
					);

					const updatedEmbed = new MessageEmbed()
						.setTitle('AUDITS / UPDATES')
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setDescription(
							`🔰 **Bad word banner was turned on.** \n\n **➤ Description?**: ${desc} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
								'MANAGE_MESSAGES'
							)}  \n\nBy: ${client.OneQuote(
								message.author.tag
							)} at ${client.OneQuote(
								moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')
							)}
						`
						)
						.setColor('#333')
						.setTimestamp()
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							message.author.displayAvatarURL()
						);
					(updated as TextChannel).send(updatedEmbed);
				}
			});
		});
	} else if (
		link === 'off' &&
		message.member.hasPermission('MANAGE_MESSAGES') &&
		message.guild.me.hasPermission('MANAGE_MESSAGES')
	) {
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ BadWords: false }
		).then((res) => {
			const OffEmbed = new MessageEmbed()
				.setDescription(`❯ Bad words banner turned off. 🔞`)
				.setColor('#333')
				.setFooter('\u3000'.repeat(10));
			message.channel.send(OffEmbed);
			mod.then((res) => {
				if (res.ModChannel === null || res.ModChannelName === null) {
					return;
				} else {
					const updated = message.guild.channels.cache.find(
						(n) => n.id === res.ModChannel
					);

					const updatedEmbed = new MessageEmbed()
						.setTitle('AUDITS / UPDATES')
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setDescription(
							`🔰 **Bad word banner was turned off.** \n\n **➤ Description?**: ${desc} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
								'MANAGE_MESSAGES'
							)}  \n\nBy: ${client.OneQuote(
								message.author.tag
							)} at ${client.OneQuote(
								moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')
							)}
						`
						)
						.setColor('#333')
						.setTimestamp()
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							message.author.displayAvatarURL()
						);
					(updated as TextChannel).send(updatedEmbed);
				}
			});
		});
	}
};

export const name: string = 'bad-words';
export const category: string = 'moderation';
export const desc: string = 'Delete bad-words immediatly.';
export const perms: string[] = ['MANAGE_MESSAGES'];
