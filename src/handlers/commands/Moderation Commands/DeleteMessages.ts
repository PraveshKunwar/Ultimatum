import { Run } from '../../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
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
		const Error = client.ErrorEmbed(
			`
        Please make sure you have the following requirements to delete a message:
        ${client.BlockQuote(
					`➤ 1. Command usage: ${prefix}<${aliases.join(
						'|'
					)}> \n➤ 2. Permissions - MANAGE_MESSAGES \n➤ 3. Can only delete a max of 100 messages at a time.`
				)}
        `,
			client,
			message
		);
		message.channel.send(Error);
	} else {
		if (message.channel.type !== 'dm') {
			message.channel.bulkDelete(NumMsgDel, true).then(async (msg) => {
				const DeletedEmbed = new MessageEmbed()
					.setColor(Colors.successful)
					.setTimestamp()
					.setTitle('Messages Deleted')
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
export const aliases: string[] = ['purge', 'del'];
export const desc: string = 'Delete x messages from channel.';
