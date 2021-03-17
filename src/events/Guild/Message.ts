import { Run } from '../../interfaces/Event';
import { Ultimatum } from '../../client';
import * as mongoose from 'mongoose';
import Prefix from '../../models/PrefixModel';
import GuildModel from '../../models/GuildModel';
import { Message, MessageEmbed } from 'discord.js';
import { words } from '../../util/BadWords';

export const run: Run = async (client, message: Message) => {
	const data: Promise<mongoose.Document<any>> | any = await Prefix.findOne({
		GuildId: message.guild?.id,
	});
	if (!data) {
		const NewData = new Prefix({
			_id: mongoose.Types.ObjectId(),
			GuildId: message.guild?.id,
			prefix: 'ult!',
		});
		return NewData.save()
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	const prefix = data ? data.prefix : 'ult!';
	const discordBanner: Promise<
		mongoose.Document<any> | any
	> = client.DatabaseManager.findOne({ GuildId: message.guild.id }, GuildModel);
	const badwordsBanner:
		| Promise<mongoose.Document<any>>
		| any = client.DatabaseManager.findOne(
		{ GuildId: message.guild.id },
		GuildModel
	);
	badwordsBanner.then((res) => {
		words.forEach((item) => {
			if (
				res.BadWords === true &&
				message.content.includes(item) &&
				!message.content.startsWith(prefix)
			) {
				if (message.deletable) {
					message.delete().then(async (msg) => {
						const badEmbed = new MessageEmbed()
							.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
							.setDescription(
								`🔰 ${client.OneQuote(
									msg.author.tag
								)} -  Please **DO NOT** send bad words here. Thank you!`
							)
							.setColor('RANDOM')
							.setTimestamp()
							.setFooter(
								`User: ${msg.author?.tag} • Created by: PraveshK`,
								msg.author.displayAvatarURL()
							);
						await msg.channel.send(badEmbed).then(async (mesg) => {
							await mesg.delete({ timeout: 5000 });
						});
					});
				} else if (
					res.BadWords === false &&
					message.content.includes(item) &&
					!message.content.startsWith(prefix)
				) {
					return;
				}
			}
		});
	});

	const discReg: RegExp = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;
	discordBanner.then((res) => {
		if (
			res.DiscordLink === true &&
			message.content.match(discReg) &&
			!message.content.startsWith(prefix)
		) {
			if (message.deletable) {
				message.delete().then(async (msg) => {
					const badEmbed = new MessageEmbed()
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setDescription(
							`🔰 ${client.OneQuote(
								msg.author.tag
							)} -  Please **DO NOT** send say bad words here! Thank you!`
						)
						.setColor('RANDOM')
						.setTimestamp()
						.setFooter(
							`User: ${msg.author?.tag} • Created by: PraveshK`,
							msg.author.displayAvatarURL()
						);
					await msg.channel.send(badEmbed).then(async (mesg) => {
						await mesg.delete({ timeout: 5000 });
					});
				});
			}
		} else if (res.DiscordLink === false) {
			return;
		}
	});
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
};

export const name: string = 'message';