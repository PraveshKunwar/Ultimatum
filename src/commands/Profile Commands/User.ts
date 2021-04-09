import { Run } from '../../interfaces/Command';
import axios, { AxiosResponse } from 'axios';
import { MessageEmbed, MessageFlags } from 'discord.js';
import Colors from '../../utils/utils';

export const run: Run = async (client, message, args, prefix) => {
	const user = message.mentions.members.first() || message.member;
	const date = new Date(Date.parse(`${user.user.createdAt}`));
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const UserProfile = new MessageEmbed()
		.setColor(Colors.github_color_palette)
		.setTimestamp()
		.setTitle('🕵️ User Profile')
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setThumbnail(user.user.displayAvatarURL())
		.setFooter(
			`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL()
		)
		.setDescription(`User profile for ${client.OneQuote(user.user.tag)}.`)
		.addFields([
			{
				name: 'Name',
				value: user.user.tag,
				inline: true,
			},
			{
				name: 'Created At',
				value: `${month}/${day}/${year}`,
				inline: true,
			},
			{
				name: 'Roles',
				value: user.roles.cache.size,
				inline: true,
			},
			{
				name: 'Highest Role',
				value: user.roles.highest.name,
				inline: true,
			},
			{
				name: 'ID',
				value: user.id,
				inline: true,
			},
			{
				name: 'Current Status',
				value: user.user.presence.status,
				inline: true,
			},
			{
				name: 'Bot',
				value: user.user.bot,
				inline: true,
			},
			,
		]);
	message.channel.send(UserProfile);
};

export const name: string = 'user';
export const category: string = 'profile';
export const desc: string = 'Check someones Github profile out.';
export const aliases: string[] = ['u', 'member'];
