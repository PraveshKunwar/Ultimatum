import { MessageEmbed, Client, Message, Guild } from 'discord.js';
import Colors from '../util/Colors';

const DisconnectEmbed = (client?: Client, message?: Message, guild?: Guild) => {
	const Embed: MessageEmbed = new MessageEmbed()
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setTitle('⚠️ Recieved an error:')
		.setDescription(`Disconnected from voice channel...`)
		.setColor(Colors.disconnect_connect)
		.setTimestamp()
		.setFooter(
			`User: ${message.author?.tag} • Created by: PraveshK`,
			message.author.displayAvatarURL()
		);
	return Embed;
};

export { DisconnectEmbed };
