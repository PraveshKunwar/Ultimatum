import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import { Run } from '../../interfaces/Command';
import axios, { AxiosResponse } from 'axios';
import { JokeInterface } from '../../interfaces/JokeInterface';

export const run: Run = async (client, message, args) => {
	axios
		.get('https://official-joke-api.appspot.com/random_joke')
		.then((res: AxiosResponse) => {
			const JokeEmbed = new MessageEmbed()
				.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
				.setDescription(
					`**➤ Q**: ${res.data.setup} \n\n **➤ A**: ${res.data.punchline}`
				)
				.setColor('#333')
				.setTimestamp()
				.setFooter(
					`User: ${message.author?.tag} • Created by: PraveshK`,
					message.author.displayAvatarURL()
				);
			message.channel.send(JokeEmbed).then(async (msg) => {
				await msg.react('👍');
				await msg.react('👎');
			});
		});
};

export const name: string = 'joke';
export const category: string = 'misc';
export const desc: string = 'Gets a random mild joke.';
