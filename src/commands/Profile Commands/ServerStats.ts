import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args) => {
	const date = new Date(Date.parse(`${message.guild?.createdAt}`));
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const ServerStats = new MessageEmbed()
		.setColor('#333')
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setTitle('📈 Server Stats:')
		.setFooter(
			`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL()
		)
		.setTimestamp()
		.addFields(
			{
				name: 'Owner',
				value: message.guild?.owner?.user.username,
				inline: true,
			},
			{
				name: 'Server Name',
				value: message.guild?.name,
				inline: true,
			},
			{
				name: 'Total Members',
				value: message.guild?.members.cache.size,
				inline: true,
			},
			{
				name: 'Total Channels',
				value: message.guild?.channels.cache.size,
				inline: true,
			},
			{
				name: 'Total Roles',
				value: message.guild?.roles.cache.size,
				inline: true,
			},
			{
				name: 'Created at',
				value: `${month}/${day}/${year}`,
				inline: true,
			},
			{
				name: 'Region',
				value: message.guild?.region,
				inline: true,
			},
			{
				name: 'Description',
				value: message.guild?.description
					? message.guild?.description
					: 'No description!',
				inline: true,
			}
		);
	message.channel.send(ServerStats);
};

export const name: string = 'server';
export const category: string = 'server';
export const desc: string = 'Stats for your server.';
