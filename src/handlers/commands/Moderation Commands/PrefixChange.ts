import { Run } from '../../../interfaces/Command';
import Prefix from '../../../models/PrefixModel';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';

export const run: Run = async (client, message, args, prefix) => {
	const NewPrefix: string | number = args[0];

	if (
		!NewPrefix ||
		!message.member?.hasPermission('MANAGE_GUILD') ||
		NewPrefix.endsWith(typeof Number)
	) {
		const Error = client.ErrorEmbed(
			`Please make sure you meet the following requirements:
        ${client.BlockQuote(
					` ➤ 1. Command Usage: ${prefix}prefix <NewPrefix>\n ➤ 2. Permissions - MANAGE_GUILD`
				)}
        `,
			client,
			message
		);
		message.channel.send(Error);
	} else if (NewPrefix && message.member.hasPermission('MANAGE_GUILD')) {
		client.DatabaseManager.findCreateUpdateOne(
			{
				GuildId: message.guild?.id,
			},
			Prefix,
			{
				_id: mongoose.Types.ObjectId(),
				prefix: 'ult!',
				GuildId: message.guild?.id,
			},
			{
				prefix: NewPrefix,
			}
		);
		const NewPrefixEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('Changed server prefix:')
			.setDescription(`New Prefix: **${NewPrefix}**`)
			.setColor(Colors.successful)
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(NewPrefixEmbed);
	}
};

export const name: string = 'prefix';
export const category: string = 'moderation';
export const desc: string = 'Change the prefix of the bot per server.';
