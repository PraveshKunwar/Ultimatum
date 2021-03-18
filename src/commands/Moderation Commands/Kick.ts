import { Run } from '../../interfaces/Command';
import GuildModel from '../../models/GuildModel';
import { MessageEmbed, GuildMember, TextChannel } from 'discord.js';
import moment from 'moment';

export const run: Run = async (client, message, args, prefix) => {
	const member = message.mentions.members.first();
	const mod: any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	if (
		!message.member.hasPermission('KICK_MEMBERS') ||
		!message.guild.me.hasPermission('KICK_MEMBERS')
	) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`KICK_MEMBERS`
				)}`,
				client,
				message
			)
		);
	} else if (!member) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify someone for me to kick: \n\n 🔰 **${prefix}kick @user#123 <reason>** ${client.OneQuote(
					'Kicks user#123 for some reason. (Reason is optional).'
				)}`,
				client,
				message
			)
		);
	} else if (
		message.member.roles.highest.position < member.roles.highest.position ||
		message.guild.me.roles.highest.position < member.roles.highest.position
	) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Cannot kick ${client.OneQuote(
					member.user.username
				)}. I must have a higher role than the mentioned user and you must have a higher role than the user as well.`,
				client,
				message
			)
		);
	} else if (
		member &&
		message.member.hasPermission('KICK_MEMBERS') &&
		message.guild.me.hasPermission('KICK_MEMBERS') &&
		message.guild.me.roles.highest.position > member.roles.highest.position &&
		message.member.roles.highest.position > member.roles.highest.position &&
		member.bannable
	) {
		const optreason = args
			.join(' ')
			.replace(member.id, '')
			.replace('<@!>', '')
			.trim();
		await member.kick(optreason).then((member: GuildMember) => {
			const KickedEmbed = new MessageEmbed()
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setDescription(
					`➤ User ${client.OneQuote(
						member.user.tag
					)} was kicked for: ${client.OneQuote(
						optreason ? optreason : 'No Reason!'
					)} \n\n➤ Pay respects in the chat.`
				)
				.setColor('RANDOM')
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag} • Created by: PraveshK`,
					message.author.displayAvatarURL()
				);
			message.channel.send(KickedEmbed);
			mod.then((res) => {
				if (res.ModChannel === null || res.ModChannelName === null) {
					return;
				} else {
					const updated = message.guild.channels.cache.find(
						(n) => n.name === res.ModChannelName
					);
					const removeEmbed = new MessageEmbed()
						.setTitle('AUDITS / UPDATES')
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setDescription(
							`🔰 **User ${
								member.user.tag
							} was kicked.** \n\n **➤ Reason**: ${optreason} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
								'KICK_MEMBERS'
							)}  \n\nKicked By: ${client.OneQuote(
								message.author.tag
							)} at ${client.OneQuote(
								moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')
							)}
						`
						)
						.setColor('RANDOM')
						.setTimestamp()
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							message.author.displayAvatarURL()
						);
					(updated as TextChannel).send(removeEmbed);
				}
			});
		});
	}
};

export const name: string = 'kick';
export const category: string = 'moderation';
export const desc: string = 'Delete discord invite links immediatly.';
export const perms: string[] = ['KICK_MEMBERS'];
