import { Run } from '../../interfaces/Event';
import { GuildType } from '../../interfaces/GuildInterface';
import GuildModel from '../../models/guild.model';
import { Message, MessageEmbed } from 'discord.js';
import { words } from '../../utils/utils';
//@ts-ignore
export const run: Run = async (client, message: Message) => {
	client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	).then((res: GuildType | any) => {
		const prefix = res.Prefix ? res.Prefix : 'ult!';
		const discReg: RegExp = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;
		if (
			res.DiscordLink === true &&
			message.content.match(discReg) &&
			!message.content.startsWith(prefix)
		) {
			if (message.deletable) {
				message.delete().then(async (msg) => {
					const badEmbed = new MessageEmbed()
						.setDescription(
							`🔰 ${client.OneQuote(
								msg.author.tag
							)} -  Please **DO NOT** send discord links in here! Thank you!`
						)
						.setColor('#333');
					await msg.channel.send(badEmbed).then(async (mesg) => {
						await mesg.delete({ timeout: 5000 });
					});
				});
			}
		} else if (res.DiscordLink === false) {
			return;
		}
		if (res.BadWords === true && !message.content.startsWith(prefix)) {
			words.forEach((item) => {
				if (message.deletable && message.content.includes(item)) {
					message.delete().then(async (msg) => {
						const badEmbed = new MessageEmbed()
							.setDescription(
								`🔰 ${client.OneQuote(
									msg.author.tag
								)} -  Please **DO NOT** send bad words here. Thank you!`
							)
							.setColor('#333');
						await msg.channel.send(badEmbed).then(async (mesg) => {
							await mesg.delete({ timeout: 5000 });
						});
					});
				}
			});
		}
		if (
			message.author.bot ||
			!message.guild ||
			!message.content.startsWith(prefix)
		)
			return;
		const args: string[] | any[] = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		const cmd: string = args.shift();
		const command = client.commands.get(cmd) || client.aliases.get(cmd);
		if (!command) return;
		else {
			command.run(client, message, args, prefix);
		}
	});
};

export const name: string = 'message';
