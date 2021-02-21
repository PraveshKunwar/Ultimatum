import { Run } from '../../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import ErrorEmbed from '../../../errors/ErrorEmbed';
import BlockQuote from '../../../util/BlockQuote';
import Colors from '../../../util/Colors';

export const run: Run = async (client, message, args, prefix) => {
	const NumMsgDel = parseInt(args[0]);
	if (
		isNaN(NumMsgDel) ||
		!message.member?.hasPermission('MANAGE_MESSAGES') ||
		!message.guild?.me?.hasPermission('MANAGE_MESSAGES') ||
		!NumMsgDel ||
		NumMsgDel > 100
	) {
		const Error = ErrorEmbed(
			`
        Please make sure you have the following requirements to delete a message:
        ${BlockQuote(`
        1. Must have permission: MANAGE_MESSAGES. (For both you and me!)
        2. Must correctly use this command (Ex: ${prefix}Delete 100)
        3. Number must not be greater than a 100.
        4. Must be a number, nothing else.
        `)}
        `,
			client,
			message
		);
	} else {
		if (message.channel.type !== 'dm') {
			message.channel.bulkDelete(NumMsgDel).then(async (msg) => {
				const DeletedEmbed = new MessageEmbed()
					.setColor(Colors.successful)
					.setTimestamp()
					.setTitle('🗑️ Messages Deleted')
					.setDescription(
						`Deleted ${NumMsgDel} messages by ${message.author.tag}`
					)
					.setFooter(
						`User: ${message.author?.tag} • Created by: PraveshK`,
						message.author.displayAvatarURL()
					)
					.setAuthor(client.user?.tag, client.user?.displayAvatarURL());
				message.channel
					.send(DeletedEmbed)
					.then((msg) => msg.delete({ timeout: 3000 }));
				await message.react('🗑️');
			});
		}
	}
};

export const name: string = 'delete';
export const category: string = 'moderation';
