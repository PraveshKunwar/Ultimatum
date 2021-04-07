import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args) => {
	message.channel.send(
		`**PONG** 🏓 - Latency was ${
			Date.now() - message.createdTimestamp
		}ms. \n\n API Latency was ${Math.round(client.ws.ping)}ms. `
	);
};
export const name: string = 'ping';
export const category: string = 'misc';
export const desc: string =
	'Get data from the official Mozilla Developer documentation.';
