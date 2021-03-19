import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args, prefix) => {
	const helpwith = args[0];
	if (!helpwith) {
		const HelpEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('Help Page')
			.setDescription(
				`➤ Welcome to the help page for **Ultimatum**. You can check out the official source code for the bot [here](https://github.com/PraveshKunwar/Ultimatum). If you need further help, please contact PraveshK#4056. Thank you!
				\n\n **Docs**: ${client.commands
					.filter((i) => i.category === 'docs')
					.forEach((x) => {
						x.name;
					})}
				`
			)
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(HelpEmbed);
	}
	if (helpwith && typeof client.commands.get(helpwith) === 'undefined') {
		message.channel.send(
			client.ErrorEmbed(
				`➤ Please make sure you specify a valid command to get help on. If you are stuck, try ${client.OneQuote(
					`${prefix}help`
				)} to get a list of commands you can get help on!`,
				client,
				message
			)
		);
	} else if (
		helpwith &&
		typeof client.commands.get(helpwith).name === 'string'
	) {
		const getIt = client.commands.get(helpwith);
		const HelpEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle(`Help | ${helpwith}`)
			.setDescription(
				`⭐ **${
					helpwith.charAt(0).toUpperCase() + helpwith.slice(1)
				}** - Command Info: \n
				**🎉 Description**: ${client.OneQuote(
					client.commands.get(helpwith).desc
						? client.commands.get(helpwith).desc
						: 'No description.'
				)}\n
				**🎉 Aliases**: ${client.OneQuote(
					client.commands.get(helpwith).aliases
						? client.commands.get(helpwith).aliases.join(', ')
						: 'No aliases.'
				)}\n
				**🎉 Category**: ${client.OneQuote(
					client.commands.get(helpwith).category
						? client.commands.get(helpwith).category
						: 'No category.'
				)}\n
				**🎉 Permissions**: ${client.OneQuote(
					client.commands.get(helpwith).perms
						? client.commands.get(helpwith).perms.join(', ')
						: 'No specific perms needed.'
				)}
				`
			)
			.setColor('RANDOM')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(HelpEmbed);
	}
};

export const name: string = 'help';
export const category: string = 'server';
export const desc: string =
	'The help command to help you navigate through the bot.';
