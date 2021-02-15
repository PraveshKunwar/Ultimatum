import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import mongoose from 'mongoose';
import { Message, MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import Moderation from '../../models/Moderation';

export const run: Run = async (client, message, args, prefix) => {
	const MentionedUser = message.mentions.members?.first();
	args.shift();
	const reason = args.join(' ');
	if (
		!MentionedUser ||
		!reason ||
		!message.member?.hasPermission('KICK_MEMBERS') ||
		!message.guild?.me?.hasPermission('KICK_MEMBERS') ||
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
	} else {
		const ModChannel = await Moderation.findOne(
			{
				GuildId: message.guild?.id,
			},
			(err: any, channel: any) => {
				err ? console.log(err) : false;
				if (!channel) {
					const NewMod = new Moderation({
						_id: mongoose.Types.ObjectId(),
						ModerationChannel: message.channel.id,
						GuildId: message.guild?.id,
					});
					NewMod.save()
						.then((res) => console.log(res))
						.catch((err) => console.log(err));
					MentionedUser.kick(reason);
					const MainChannel = new MessageEmbed()
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setTitle('👟 Recieved an error:')
						.setDescription(
							`Kicked member: **${MentionedUser.user.username}**. Lets get some F's in the chat.`
						)
						.setColor(Colors.successful)
						.setTimestamp()
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							message.author.displayAvatarURL()
						);
					message.channel.send(MainChannel);
					client.channels.cache.get(ModChannel);
				}
			}
		);
		console.log(ModChannel);
	}
};

export const name: string = 'kick';
