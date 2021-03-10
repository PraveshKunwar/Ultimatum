import { MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import { Run } from '../../../interfaces/Command';
import * as math from 'mathjs';

export const run: Run = async (client, message, args, prefix) => {
	const expression: string = args.join(' ');
	console.log(expression);
	if (!expression) {
		const Error = client.ErrorEmbed(
			`➤ 1. Please enter a valid expression for me to calculate. \n\n
    **Examples:**
    ${client.BlockQuote(
			`
    ${prefix}Google what's the weather today?
    ${prefix}Google latest news!
    `
		)}
    `,
			client,
			message
		);
		message.channel.send(Error);
	} else if (expression) {
		const evaluate = math.evaluate(expression);
		message.channel.send(evaluate);
	}
};

export const name: string = 'calc';
export const category: string = 'misc';
export const aliases: string[] = ['math', 'calculate'];
export const desc: string = 'Calculate a simple equation or expression.';
