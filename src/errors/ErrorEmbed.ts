import { MessageEmbed, Client, Message } from 'discord.js';
import Colors from '../util/Colors';

const ErrorEmbed = (
	err: string,
	client: Client,
	message: Message,
	external?: string | any
) => {
	const Embed: MessageEmbed = new MessageEmbed()
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setTitle('⚠️ Recieved an error:')
		.setDescription(`Error: **${err}**`)
		.setColor(Colors.error)
		.setTimestamp()
		.setFooter(
			`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL()
		);
	return Embed;
};
export default ErrorEmbed;
