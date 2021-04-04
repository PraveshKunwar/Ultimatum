import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import GuildModel from '../../models/GuildModel';
import { TextChannel } from 'discord.js';
import moment from 'moment';
import { isJSDocReturnTag } from 'typescript';

export const run: Run = async (client, message, args, prefix) => {
	const NumMsgDel = parseInt(args[0]);
	const mod: any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	if (isNaN(NumMsgDel) || NumMsgDel > 100 || !NumMsgDel) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify a number (less than or equal to 100).`,
				client,
				message
			)
		);
	}
	if (
		!message.member?.hasPermission('MANAGE_MESSAGES') ||
		!message.guild?.me?.hasPermission('MANAGE_MESSAGES')
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
	} else {
		if (message.channel.type !== 'dm') {
			try {
				await message.channel.messages
					.fetch({ limit: NumMsgDel })
					.then((msg) => {
						(message.channel as TextChannel)
							.bulkDelete(msg)
							.catch((e) => {
								if (e) {
									const DeletedEmbed = new MessageEmbed()
										.setColor('#333')
										.setDescription(`❯ ${e}`);
									message.channel.send(DeletedEmbed);
								}
							})

							.then((msg) => {
								const DeletedEmbed = new MessageEmbed()
									.setColor('#333')
									.setDescription(`❯ Deleted ${NumMsgDel} messages. 🗑`);
								message.channel.send(DeletedEmbed).then((msg) => {
									mod.then((res) => {
										if (
											res.ModChannel === null ||
											res.ModChannelName === null
										) {
											return;
										} else {
											const updated = message.guild.channels.cache.find(
												(n) => n.id === res.ModChannel
											);
											const updatedEmbed = new MessageEmbed()
												.setTitle('AUDITS / UPDATES')
												.setAuthor(
													client.user?.tag,
													client.user?.displayAvatarURL()
												)
												.setDescription(
													`🔰Messages deleted: ${client.OneQuote(
														NumMsgDel
													)} in ${client.OneQuote(
														`#${(message.channel as TextChannel).name}.`
													)} \n\n **➤ Description?**: ${desc} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
														'MANAGE_MESSAGES'
													)} \n\nDeleted By: ${client.OneQuote(
														message.author.tag
													)} at ${client.OneQuote(
														moment(message.createdAt).format(
															'MMMM Do YYYY, h:mm:ss a'
														)
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
								message.react('🗑️');
							});
					});
			} catch (e) {
				if (e) {
					return;
				}
			}
		}
	}
};

export const name: string = 'delete';
export const category: string = 'moderation';
export const aliases: string[] = ['purge', 'del', 'clear'];
export const desc: string = 'Delete x messages from channel.';
export const perms: string[] = ['MANAGE_MESSAGES'];
