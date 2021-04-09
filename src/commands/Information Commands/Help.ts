import { Run } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { ReturnMappedVals } from '../../utils/utils';

export const run: Run = async (client, message, args, prefix) => {
	const helpwith = args[0];
	if (!helpwith) {
		const HelpEmbed = new MessageEmbed()
			.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
			.setTitle('Help Page')
			.setDescription(
				`➤ Welcome to the help page for **Ultimatum**. You can check out the official source code for the bot [here](https://github.com/PraveshKunwar/Ultimatum). If you need further help, please contact PraveshK#4056. Thank you!
				\n\n **📜 Documenations**: ${client.OneQuote(
					ReturnMappedVals(client.commands, 'docs').join(' | ')
				)}\n\n **⚙️ Server**: ${client.OneQuote(
					ReturnMappedVals(client.commands, 'server').join(' | ')
				)}\n\n **🎵 Music**:  ${client.OneQuote(
					ReturnMappedVals(client.commands, 'music').join(' | ')
				)}\n\n **📎 Info**: ${client.OneQuote(
					ReturnMappedVals(client.commands, 'info').join(' | ')
				)}\n\n **🏆 Miscellanous**: ${client.OneQuote(
					ReturnMappedVals(client.commands, 'misc').join(' | ')
				)}\n\n **🛠️ Moderation**: ${client.OneQuote(
					ReturnMappedVals(client.commands, 'moderation').join(' | ')
				)}\n\n **🕵️ Profile**: ${client.OneQuote(
					ReturnMappedVals(client.commands, 'profile').join(' | ')
				)}\n\n ➤ ***For further information on a command***: \n If you want more information on a command, type ${client.OneQuote(
					`${prefix}help <CommandName>`
				)} to get more information on a specific command, including aliases, description, permissions, etc! \n\n ***For any issues***: If you have any issues, please contact **PraveshK#4056**. Thank you. \n\n **External Info**: \n\n [Invite Me](https://discord.com/api/oauth2/authorize?client_id=806540029052059698&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauthorized&scope=bot) • [Support Server](https://discord.gg/2dxa2S24KZ) • [Github](https://github.com/PraveshKunwar/Ultimatum)
				`
			)
			.setThumbnail(message.guild.icon)
			.setColor('#333')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(HelpEmbed).then(async (msg) => {
			await msg.react('👍');
			await msg.react('👎');
		});
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
				`🚀 **${
					helpwith.charAt(0).toUpperCase() + helpwith.slice(1)
				}** - Command Info: \n
				**⭐ Description**: ${client.OneQuote(
					client.commands.get(helpwith).desc
						? client.commands.get(helpwith).desc
						: 'No description.'
				)}\n
				**🔥 Aliases**: ${client.OneQuote(
					client.commands.get(helpwith).aliases
						? client.commands.get(helpwith).aliases.join(', ')
						: 'No aliases.'
				)}\n
				**🎉 Category**: ${client.OneQuote(
					client.commands.get(helpwith).category
						? client.commands.get(helpwith).category
						: 'No category.'
				)}\n
				**🔰 Permissions**: ${client.OneQuote(
					client.commands.get(helpwith).perms
						? client.commands.get(helpwith).perms.join(', ')
						: 'No specific perms needed.'
				)}
				`
			)
			.setColor('#333')
			.setTimestamp()
			.setFooter(
				`User: ${message.author?.tag} • Created by: PraveshK`,
				message.author.displayAvatarURL()
			);
		message.channel.send(HelpEmbed).then(async (msg) => {
			await msg.react('👍');
			await msg.react('👎');
		});
	}
};

export const name: string = 'help';
export const category: string = 'info';
export const desc: string =
	'The help command to help you navigate through the bot.';
