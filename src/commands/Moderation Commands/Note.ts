import { Run } from '../../interfaces/Command';
import NoteModel from '../../models/NoteModel';
import GuildModel from '../../models/GuildModel';
import { MessageEmbed, TextChannel } from 'discord.js';
import moment from 'moment';
import mongoose from 'mongoose';

export const run: Run = async (client, message, args, prefix) => {
	const mod: any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	const user = message.mentions.users.first();
	const note = user
		? args.join(' ').replace(user.id, '').replace('<@!>', '').trim()
		: 'No note';
	if (!user) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify someone for me to set a note for: \n\n 🔰 **${prefix}<${name} | ${aliases.join(
					' | '
				)}> @user#123 <note>** ${client.OneQuote('Sets a note for user#123.')}`,
				client,
				message
			)
		);
	} else if (user && !note) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure to add a note for the user.`,
				client,
				message
			)
		);
	} else if (note.length > 2000) {
		return message.channel.send(
			client.ErrorEmbed(
				'➤ Please make sure to add a note for the user, and that the note does not exceed 2000 characters.',
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
	} else if (
		message.member.hasPermission('MANAGE_MESSAGES') &&
		user &&
		note &&
		note.length < 2000
	) {
		await client.DatabaseManager.findOne(
			{ UserId: user.id, GuildId: message.guild.id },
			NoteModel
		).then((res) => {
			if (res === null || undefined) {
				client.DatabaseManager.findAndCreate(
					{ UserId: user.id, GuildId: message.guild.id },
					NoteModel,
					{
						_id: mongoose.Types.ObjectId(),
						UserId: user.id,
						GuildId: message.guild.id,
						note: note,
					}
				).then((res) => {
					const NoteEmbed = new MessageEmbed()
						.setDescription(`❯ Set note for ${client.OneQuote(user.tag)}. 📝`)
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
									`🔰 Note was added to **User ${
										user.tag
									}.** \n\n **➤ Note**: ${note} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
										'MANAGE_MESSAGES'
									)}  \n\nNote added by: ${client.OneQuote(
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
			} else if (res !== null || undefined) {
				client.DatabaseManager.findUpdateOne(
					{ UserId: user.id, GuildId: message.guild.id },
					NoteModel,
					{ note: note }
				).then((res) => {
					const NoteEmbed = new MessageEmbed()
						.setDescription(
							`❯ Updated note for ${client.OneQuote(user.tag)}. 📝`
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
									`🔰 Note was added to **User ${
										user.tag
									}.** \n\n **➤ Note**: ${note} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
										'MANAGE_MESSAGES'
									)}  \n\nNote added by: ${client.OneQuote(
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

export const name: string = 'note';
export const aliases: string[] = [
	'set-note',
	'create-note',
	'add-note',
	'update-note',
];
export const category: string = 'moderation';
export const desc: string = 'Set or update a note for a user.';
export const perms: string[] = ['MANAGE_MESSAGES'];
