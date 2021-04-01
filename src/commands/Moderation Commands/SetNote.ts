import { Run } from '../../interfaces/Command';
import NoteModel from '../../models/NoteModel';
import { MessageEmbed } from 'discord.js';
import mongoose from 'mongoose';

export const run: Run = async (client, message, args, prefix) => {
	const user = message.mentions.users.first();
	const note = args.join(' ').replace(user.id, '').replace('<@!>', '').trim();
	if (!user) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify a user to set a note for. `,
				client,
				message
			)
		);
	}
	if (!note || note.length > 2000) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure to add a note for the user, and that the note does not exceed 2000 characters.`,
				client,
				message
			)
		);
	}
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you AND I have the following permissions: \n\n 🔰${client.OneQuote(
					`MANAGE_MESSAGES`
				)}`,
				client,
				message
			)
		);
	} else if (
		user &&
		note &&
		note.length < 2000 &&
		message.member.hasPermission('MANAGE_MESSAGES')
	) {
        
	}
};

export const name: string = 'set-note';
export const aliases: string[] = ['create-note', 'add-note'];
export const category: string = 'moderation';
export const desc: string = 'Set note for a user.';
export const perms: string[] = ['MANAGE_MESSAGES'];
