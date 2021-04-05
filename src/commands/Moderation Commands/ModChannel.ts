import { Run } from '../../interfaces/Command';
import GuildModel from '../../models/guild.model';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args, prefix) => {
	const channel = message.mentions.channels.first();
	if (!channel) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you are using the command correctly. \n\n 🔰 **${prefix}<${name} | ${aliases.join(
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
				.setDescription(
					`❯ Saved new mod channel: ${client.OneQuote(channel.name)} 🛠`
				)
				.setColor('#333')
				.setFooter('\u3000'.repeat(10));
			message.channel.send(SetEmbed);
		});
	}
};

export const name: string = 'mod-set';
export const aliases: string[] = ['mod-channel', 'mod-change'];
export const category: string = 'moderation';
export const desc: string = 'Delete discord invite links immediatly.';
export const perms: string[] = ['MANAGE_CHANNELS'];
