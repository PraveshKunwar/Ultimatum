import { MessageEmbed } from 'discord.js';
import Colors from '../../util/Colors';
import { Run } from '../../interfaces/Command';
import axios, { AxiosResponse } from 'axios';

export const run: Run = async (client, message, args) => {
	axios.get('https://type.fit/api/quotes').then((res: AxiosResponse) => {
		const randomArr = res.data[Math.floor(Math.random() * res.data.length)];
		const QuoteLink = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setDescription(
				`*${randomArr.text}* \n ➤ Author: ${client.OneQuote(randomArr.author)}`
			)
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(QuoteLink);
	});
};

export const name: string = 'quote';
export const category: string = 'misc';
export const desc: string = 'Get a random quote.';
