import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import { Run } from '../../interfaces/Command';

export const run: Run = async (client, message, args, prefix) => {
	const id = args[0];
	const user = id ? message.mentions.users.first() : message.author;
	const AvatarEmbed = new MessageEmbed()
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setDescription(`Avatar of: ${client.OneQuote(user.tag)}`)
		.setImage(user.displayAvatarURL({ size: 512 }))
		.setColor('#333')
		.setTimestamp()
		.setFooter(
			`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL()
		);
	message.channel.send(AvatarEmbed);
};

export const name: string = 'avatar';
export const aliases: string[] = ['av', 'profile-pic'];
export const category: string = 'misc';
export const desc: string =
	'Get the avatar of anyone, with a mention or a global id.';
