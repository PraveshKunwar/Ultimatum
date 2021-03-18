import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args, prefix) => {
	const categories = [...client.categories].filter((x) => x !== undefined);
	const helpwith = args.join(' ');
	if (!helpwith) {
		const HelpEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('Help Page')
			.setDescription(
				`➤ Welcome to the help page for **Ultimatum**. You can check out the official source code for the bot [here](https://github.com/PraveshKunwar/Ultimatum). If you need further help, please contact PraveshK#4056. Thank you!`
			)
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(HelpEmbed);
	}
	console.log(client.commands.get(helpwith));
};

export const name: string = 'help';
export const category: string = 'server';
export const desc: string =
	'The help command to help you navigate through the bot.';
