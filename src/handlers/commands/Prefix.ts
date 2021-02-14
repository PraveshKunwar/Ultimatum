import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import Prefix from '../../models/PrefixModel';
import mongoose, { Mongoose } from 'mongoose';
import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';

export const run: Run = async (client, message, args, prefix) => {
	const NewPrefix: string | number = args[0];
	if (
		!NewPrefix ||
		!message.member?.hasPermission('MANAGE_GUILD') ||
		NewPrefix.endsWith(typeof Number)
	) {
		const Error = ErrorEmbed(
			`Error: You may have not specified a prefix that ends with a symbol (NOT A NUMBER) OR you do not have the following permission: **MANAGE_GUILD**. \n \n
        **Examples:**
        ${BlockQuote(
					`
        ${prefix}Prefix newPrefix.
        ${prefix}Prefix prefix!
        `
				)}
        `,
			client,
			message,
			args
		);
		message.channel.send(Error);
	} else if (NewPrefix && message.member.hasPermission('MANAGE_GUILD')) {
		const settings = await Prefix.findOne(
			{
				GuildId: message.guild?.id,
			},
			(err: any, guild: any) => {
				err ? console.log(err) : false;
				if (!guild) {
					const NewPrefixUpdate = new Prefix({
						_id: mongoose.Types.ObjectId(),
						prefix: 'ult!',
						GuildId: message.guild?.id,
					});
					NewPrefixUpdate.save()
						.then((res) => console.log(res))
						.catch((err) => console.log(err));
				}
			}
		);
		await settings?.updateOne({
			prefix: NewPrefix,
		});
		const NewPrefixEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('↠ Changed server prefix:')
			.setDescription(`New Prefix: **${NewPrefix}**`)
			.setColor(Colors.successful)
			.setTimestamp()
			.setFooter(
				`↠↠ User: ${message.author?.tag}`,
				message.author.displayAvatarURL()
			);
		message.channel.send(NewPrefixEmbed);
	}
};

export const name: string = 'Prefix';
