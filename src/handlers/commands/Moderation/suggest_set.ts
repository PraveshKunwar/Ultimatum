import { Run } from '../../../interfaces/Command';
import ErrorEmbed from '../../../errors/ErrorEmbed';
import BlockQuote from '../../../util/BlockQuote';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Suggestions from '../../../models/Suggestions';
import Colors from '../../../util/Colors';

export const run: Run = async (client, message, args, prefix) => {
	const SuggestedChannel = message.mentions.channels.first();
	if (
		!SuggestedChannel ||
		!message.member?.hasPermission('MANAGE_CHANNELS') ||
		!message.guild?.me?.hasPermission('MANAGE_CHANNELS')
	) {
		const Error = ErrorEmbed(
			`
        Please make sure you have the following requirements in order to set a suggestion channel!
        ${BlockQuote(`
        1. Must have permission MANAGE_MEMBERS (for both you and me)
        2. You must use the command correctly (ex: ${prefix}suggest_set #channel)
        3. I must have a role that is higher than the user being mentioned!
        `)}
        `,
			client,
			message
		);
		message.channel.send(Error);
	} else if (
		SuggestedChannel &&
		message.member?.hasPermission('MANAGE_CHANNELS') &&
		message.guild?.me?.hasPermission('MANAGE_CHANNELS')
	) {
		const data = await Suggestions.findOne({
			GuildId: message.guild.id,
		});
		if (!data) {
			const NewData = new Suggestions({
				_id: mongoose.Types.ObjectId(),
				SuggestionChannel: SuggestedChannel.id,
				GuildId: message.guild.id,
			});
			return NewData.save()
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		} else {
			await data
				.updateOne({
					SuggestionChannel: SuggestedChannel.id,
				})
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			const NewSuggestionChannel = new MessageEmbed()
				.setColor(Colors.successful)
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag}`,
					message.author.displayAvatarURL()
				)
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setTitle('🛠 Suggestion channel complete!')
				.setDescription(
					`New mod channel complete. ${SuggestedChannel} will be used to send updates on server such as: ${BlockQuote(`1. Kicks (w reason)\n2. Bans (w reason)\n3. Mutes (w reason)\n4. Channel Updates\n5. Role Updates
            `)}`
				);
			return message.channel.send(NewSuggestionChannel).then(async (msg) => {
				await msg.react('✅');
				await msg.react('🛠');
			});
		}
	}
};
export const name: string = 'suggest_set';
