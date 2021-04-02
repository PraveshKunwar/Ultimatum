import { Run } from '../../interfaces/Command';
import NoteModel from '../../models/NoteModel';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args, prefix) => {
	const user = message.mentions.users.first();
	const note = user
		? args.join(' ').replace(user.id, '').replace('<@!>', '').trim()
		: 'No reason';
	if (!user) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify someone for me to get a note for: \n\n 🔰 **${prefix}<${name} | ${aliases.join(
					' | '
				)}> @user#123** ${client.OneQuote('Gets a note for user#123.')}`,
				client,
				message
			)
		);
	}
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		return message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you have the following permissions: \n\n 🔰${client.OneQuote(
					`MANAGE_MESSAGES`
				)}`,
				client,
				message
			)
		);
	} else if (message.member.hasPermission('MANAGE_MESSAGES') && user) {
		const note: any = client.DatabaseManager.findOne(
			{ UserId: user.id, GuildId: message.guild.id },
			NoteModel
		).then((res: any) => {
			if (res === null || undefined) {
				return message.channel.send(
					client.ErrorEmbed(
						`➤ There was no note set for user ${client.OneQuote(user.tag)}.`,
						client,
						message
					)
				);
			} else if (res !== null || undefined) {
				const NoteEmbed = new MessageEmbed()
					.setDescription(
						`❯ Note for user ${client.OneQuote(user.tag)}: ${res.note} 📝`
					)
					.setColor('#333')
					.setFooter('\u3000'.repeat(10));
				return message.channel.send(NoteEmbed);
			}
		});
	}
};

export const name: string = 'notes';
export const aliases: string[] = ['see-note', 'get-note'];
export const category: string = 'moderation';
export const desc: string = 'Get the note for a user.';
export const perms: string[] = ['MANAGE_MESSAGES'];
