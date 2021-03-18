import { Run } from '../../interfaces/Event';
import mongoose from 'mongoose';
import GuildModel from '../../models/GuildModel';
import { Guild, MessageEmbed } from 'discord.js';

export const run: Run = async (client, guild: Guild) => {
	client.DatabaseManager.findAndCreate(
		{
			GuildId: guild.id,
		},
		GuildModel,
		{
			_id: mongoose.Types.ObjectId(),
			Prefix: 'ult',
			GuildId: guild.id,
			GuildName: guild.name,
			GuildMembers: guild.memberCount,
			GuildChannels: guild.channels.cache.size,
			GuildRoles: guild.roles.cache.size,
			GuildRegion: guild.region,
			GuildOwner: guild.owner.user.username,
			createdAt: guild.createdAt,
			icon: guild.iconURL(),
			DiscordLink: null,
			ModChannel: null,
			ModChannelName: null,
			BadWords: null,
		}
	);
	const Welcome = new MessageEmbed()
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setDescription(
			`➤ Welcome to **Ultimatum.** The all in one Discord Bot. *Seriously.* Check out the info to get the bot set up! \n\n➤ To get started, please check out the help commands to get the bot set up! \n\n➤ The default prefix is ${client.OneQuote(
				'ult!'
			)} \n\n➤ You can customize it using ${client.OneQuote(
				'ult!prefix'
			)} \n\n ➤Please also give me sufficient permissions as most of my commands use a lot of the permissions!. \n **Have fun!** `
		)
		.setColor('RANDOM')
		.setTimestamp()
		.setFooter(
			`User: ${guild.owner.user.username} • Created by: PraveshK`,
			client.user.displayAvatarURL()
		);
	guild.owner.user.send(Welcome);
};

export const name: string = 'guildCreate';
