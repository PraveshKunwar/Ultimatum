import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import Moderation from '../../models/Moderation';

export const run: Run = async (client, message, args, prefix) => {
	const MentionedChannel = message.mentions.channels.first()?.id;
	console.log(`<#${MentionedChannel}>`);
	if (
		!MentionedChannel ||
		!message.member?.hasPermission('MANAGE_CHANNELS') ||
		!message.guild?.me?.hasPermission('MANAGE_CHANNELS')
	) {
		const Error = ErrorEmbed(
			`
		Please make sure you have the following requirements to create a new mod channel!
		${BlockQuote(`
		1. Must have permission MANAGE_CHANNELS (For both you and me!)
		2. You didn't specify a channel (Ex: ${prefix}mod-channel #some-channel)
		`)}
		`,
			client,
			message
		);
		message.channel.send(Error);
	} else if (
		MentionedChannel &&
		message.member.hasPermission('MANAGE_CHANNELS') &&
		message.guild.me.hasPermission('MANAGE_CHANNELS')
	) {
		const ModChannel = await Moderation.findOne(
			{
				GuildId: message.guild?.id,
			},
			(err: any, channel: any) => {
				err ? console.log(err) : false;
				if (!channel) {
					const ModChannel = new Moderation({
						_id: mongoose.Types.ObjectId(),
						ModerationChannel: message.channel.id,
						GuildId: message.guild?.id,
					});
					ModChannel.save()
						.then((res) => {
							console.log(res);
						})
						.catch((err) => console.log(err));
				}
			}
		);
		await Moderation.updateOne({
			ModerationChannel: MentionedChannel,
		});
		const NewModChannel = new MessageEmbed()
			.setColor(Colors.successful)
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag}`,
				message.author.displayAvatarURL()
			)
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('🛠 Moderation channel complete!')
			.setDescription(
				`New mod channel complete. <#${MentionedChannel}> will be used to send updates on server such as: 
						${BlockQuote(`
						1. Kicks (w reason)
						2. Bans (w reason)
						3. Mutes (w reason)
						4. Channel Updates
						5. Role Updates
						`)}`
			);
		message.channel.send(NewModChannel).then(async (msg) => {
			await msg.react('✅');
			await msg.react('🛠');
		});
	}
};

export const name: string = 'mod-channel';
