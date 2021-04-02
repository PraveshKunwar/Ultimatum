import { Run } from '../../interfaces/Command';
import NoteModel from '../../models/NoteModel';
import GuildModel from '../../models/GuildModel';
import { MessageEmbed, TextChannel } from 'discord.js';
import moment from 'moment';

export const run: Run = async (client, message, args, prefix) => {
	const user = message.mentions.users.first();
	const mod: any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	const optreason = user
		? args.join(' ').replace(user.id, '').replace('<@!>', '').trim()
		: 'No reason';
	if (!user) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify someone for me to clear a note for: \n\n 🔰 **${prefix}<${name} | ${aliases.join(
					' | '
				)}> @user#123** ${client.OneQuote('Clears the note for user#123.')}`,
				client,
				message
			)
		);
	}
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you have the following permissions: \n\n 🔰${client.OneQuote(
					`MANAGE_MESSAGES`
				)}`,
				client,
				message
			)
		);
	} else if (message.member.hasPermission('MANAGE_MESSAGES') && user) {
		const note: any = client.DatabaseManager.findOne(
			{ UserId: user.id, GuildId: message.guild.id },
			NoteModel
		).then((res) => {
			if (res === null || undefined) {
				return message.channel.send(
					client.ErrorEmbed(
						`➤ There was no note set for user ${client.OneQuote(user.tag)}.`,
						client,
						message
					)
				);
			} else if (res !== null || undefined) {
				client.DatabaseManager.findOneAndRemove(
					{ UserId: user.id, GuildId: message.guild.id },
					NoteModel
				).then((res) => {
					const NoteEmbed = new MessageEmbed()
						.setDescription(
							`❯ Cleared notes for ${client.OneQuote(user.tag)}. 📝`
						)
						.setColor('#333')
						.setFooter('\u3000'.repeat(10));
					message.channel.send(NoteEmbed);
					mod.then((res) => {
						if (res.ModChannel === null || res.ModChannelName === null) {
							return;
						} else {
							const updated = message.guild.channels.cache.find(
								(n) => n.id === res.ModChannel
							);
							const removeEmbed = new MessageEmbed()
								.setTitle('AUDITS / UPDATES')
								.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
								.setDescription(
									`🔰 Note was removed from **User ${
										user.tag
									}.** \n\n **➤ Note**: ${note} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
										'MANAGE_MESSAGES'
									)}  \n\nNote removed by: ${client.OneQuote(
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
							(updated as TextChannel).send(removeEmbed);
						}
					});
				});
			}
		});
	}
};

export const name: string = 'clear-notes';
export const aliases: string[] = ['remove-note', 'delete-note', 'purge-note'];
export const category: string = 'moderation';
export const desc: string = 'Get the note for a user.';
export const perms: string[] = ['MANAGE_MESSAGES'];
