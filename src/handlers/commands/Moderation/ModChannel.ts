/*import { Run } from '../../../interfaces/Command';
import ErrorEmbed from '../../../errors/ErrorEmbed';
import BlockQuote from '../../../util/BlockQuote';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import Moderation from '../../../models/Moderation';

export const run: Run = async (client, message, args, prefix) => {
	const MentionedChannel = message.mentions.channels.first();
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
		3. Please make sure that the channel is a text channel only!
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
		await Moderation.findOne(
			{
				GuildId: message.guild?.id,
			},
			(err: any, guild: any) => {
				err ? console.log(err) : false;
				if (!guild) {
					const NewMod = new Moderation({
						_id: mongoose.Types.ObjectId(),
						GuildId: message.guild?.id,
						ModerationChannel: MentionedChannel.id,
					});
					NewMod.save()
						.then((res) => console.log(res))
						.catch((err) => console.log(err));

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
							`New mod channel complete. <#${MentionedChannel}> will be used to send updates on server such as: ${BlockQuote(`1. Kicks (w reason)\n2. Bans (w reason)\n3. Mutes (w reason)\n4. Channel Updates\n5. Role Updates
								`)}`
						);
					return message.channel.send(NewModChannel).then(async (msg) => {
						await msg.react('✅');
						await msg.react('🛠');
					});
				} else {
					Moderation.updateOne({
						ModerationChannel: MentionedChannel.id,
					})
						.then((res) => console.log(res))
						.catch((err) => console.log(err));

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
							`New mod channel complete. ${MentionedChannel} will be used to send updates on server such as: ${BlockQuote(`1. Kicks (w reason)\n2. Bans (w reason)\n3. Mutes (w reason)\n4. Channel Updates\n5. Role Updates
											`)}`
						);
					return message.channel.send(NewModChannel).then(async (msg) => {
						await msg.react('✅');
						await msg.react('🛠');
					});
				}
			}
		);
	}
};

export const name: string = 'mod-channel'*/
export const category: string = 'moderation';
