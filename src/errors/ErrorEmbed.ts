import { MessageEmbed, Message } from 'discord.js';
import Colors from '../util/Colors';
import client from '../index';
const ErrorEmbed = (err: string, message: Message, external?: string | any) => {
	const Embed: MessageEmbed = new MessageEmbed()
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setDescription(`${err}`)
		.setColor(Colors.error)
		.setTimestamp()
		.setFooter(
			`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL()
		);
	return Embed;
};
export default ErrorEmbed;
