import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import GuildModel from '../../models/GuildModel';
import moment from 'moment';
import { TextChannel } from 'discord.js';

export const run: Run = async (client, message, args, prefix) => {
	const NewPrefix: string | number = args[0];
	const mod: any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	if (!NewPrefix) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify a new prefix: \n\n 🔰 **${prefix}prefix !** ${client.OneQuote(
					'Sets the prefix to !'
				)}`,
				client,
				message
			)
		);
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			message.channel.send(
				client.ErrorEmbed(
					`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
						`MANAGE_GUILD`
					)}`,
					client,
					message
				)
			);
		}
	} else if (NewPrefix && message.member.hasPermission('MANAGE_GUILD')) {
		client.DatabaseManager.findUpdateOne(
			{ GuildId: message.guild.id },
			GuildModel,
			{ Prefix: NewPrefix }
		);
		const NewPrefixEmbed = new MessageEmbed()
			.setDescription(`**❯ Saved new prefix:** ${client.OneQuote(NewPrefix)}`)
			.setColor('#333');
		message.channel.send(NewPrefixEmbed);
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
						`🔰New prefix was set to: ${client.OneQuote(
							NewPrefix
						)} \n\n **➤ Description?**: ${desc} \n**➤ REQUIRED PERMS:** ${client.OneQuote(
							'MANAGE_GUILD'
						)} \n\nUpdated By: ${client.OneQuote(
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
	}
};

export const name: string = 'prefix';
export const category: string = 'moderation';
export const desc: string = 'Change the prefix of the bot per server.';
export const perms: string[] = ['MANAGE_GUILD'];
