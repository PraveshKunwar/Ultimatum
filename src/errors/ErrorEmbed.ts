import { MessageEmbed, Client, Message } from 'discord.js';
import Colors from '../utils/utils';

const ErrorEmbed = (
	err: string,
	client?: Client,
	message?: Message,
	external?: string | any
) => {
	const Embed: MessageEmbed = new MessageEmbed()
		.setAuthor(`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL())
		.setDescription(`${err}`)
		.setColor(Colors.error)
		.setTimestamp()
		.setFooter('\u3000'.repeat(10));
	return Embed;
};

export default ErrorEmbed;
