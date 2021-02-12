import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import Prefix from '../../models/PrefixModel';
import mongoose from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';

export const run: Run = async (client, message, args) => {
	const NewPrefix: string | number = args[0];
	if (!NewPrefix || !message.member?.hasPermission('MANAGE_GUILD')) {
		ErrorEmbed(
			`Error: You may have not specified a prefix OR you do not have the following permission: **MANAGE_GUILD**.
        **Examples:**
        ${BlockQuote(
					`
        ult!Prefix newPrefix.
        ult!Prefix prefix!
        `,
					'js'
				)}
        `,
			client,
			message,
			args
		);
	} else {
		const prefix = new Prefix({
			_id: mongoose.Schema.Types.ObjectId,
			prefix: NewPrefix,
		});
		prefix.save().then((res) => {
			console.log(res);
			const NewPrefixEmbed = new MessageEmbed()
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setTitle('↠ Google Search:')
				.setDescription(`New Prefix: **${NewPrefix}**`)
				.setColor(Colors.successful)
				.setTimestamp()
				.setFooter(
					`↠↠ User: ${message.author?.tag}`,
					message.author.displayAvatarURL()
				);
			message.channel.send(NewPrefixEmbed);
		});
	}
};

export const name: string = 'Prefix';
