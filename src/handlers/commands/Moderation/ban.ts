import { Run } from '../../../interfaces/Command';
import ErrorEmbed from '../../../errors/ErrorEmbed';
import BlockQuote from '../../../util/BlockQuote';
import mongoose from 'mongoose';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import Colors from '../../../util/Colors';
import Moderation from '../../../models/ModerationModel';

export const run: Run = async (client, message, args, prefix) => {
	const MentionedUser = message.mentions.members?.first();
	args.shift();
	const reason = args.join(' ');
	if (
		!MentionedUser ||
		!reason ||
		!message.member?.hasPermission('BAN_MEMBERS') ||
		!message.guild?.me?.hasPermission('BAN_MEMBERS') ||
		MentionedUser.roles.highest.position >
			message.guild.me.roles.highest.position
	) {
		const Error = ErrorEmbed(
			`
        Please make sure you meet the following requirements:
        ${BlockQuote(`
        1. Must have permission KICK_MEMBERS (for both you and me)
        2. You must use the command correctly (ex: ${prefix}kick @user#123 <reason!>)
        3. I must have a role that is higher than the user being mentioned!
        `)}
        `,
			client,
			message
		);
		message.channel.send(Error);
	} else if (
		MentionedUser &&
		reason &&
		message.member?.hasPermission('BAN_MEMBERS') &&
		message.guild?.me?.hasPermission('BAN_MEMBERS') &&
		message.guild.me.roles.highest.position >
			MentionedUser.roles.highest.position
	) {
		const MainChannelEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('🔨 Banned Member')
			.setDescription(
				`Banned user **${MentionedUser.user.username}**. \n Reason: ${reason}\n\n Lets get some F's in the chat.`
			)
			.setColor(Colors.successful)
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		MentionedUser.ban();
		message.channel.send(MainChannelEmbed);
	}
};

export const name: string = 'ban';
export const category: string = 'moderation';
