import { Run } from '../../interfaces/Event';
import mongoose from 'mongoose';
import GuildModel from '../../models/guild.model';
import { Guild, MessageEmbed } from 'discord.js';

export const run: Run = async (client, guild: Guild) => {
	client.DatabaseManager.findAndCreate(
		{
			GuildId: guild.id,
		},
		GuildModel,
		{
			_id: mongoose.Types.ObjectId(),
			Prefix: 'ult!',
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
			Welcome: Boolean,
		}
	);
	const Welcome = new MessageEmbed()
		.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
		.setThumbnail(guild.owner.user.displayAvatarURL())
		.setDescription(
			`➤ Welcome to **Ultimatum.** The all in one Discord Bot. *Seriously.* Check out the info to get the bot set up! \n\n➤ To get started, please check out the help commands to get the bot set up! To do this, type ${client.OneQuote(
				`ult!help`
			)} in the channel. \n\n➤ The default prefix is ${client.OneQuote(
				'ult!'
			)} \n\n➤ You can customize it using ${client.OneQuote(
				'ult!prefix'
			)} \n\n ➤Please also give me sufficient permissions as most of my commands use a lot of the permissions!. \n\n ***For any issues***: If you have any issues, please contact **PraveshK#4056**. Thank you. \n\n **External Info**: \n\n [Invite Me](https://discord.com/api/oauth2/authorize?client_id=806540029052059698&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauthorized&scope=bot) • [Support Server](https://discord.gg/2dxa2S24KZ) • [Github](https://github.com/PraveshKunwar/Ultimatum) \n\n **Have fun!** `
		)
		.setColor('#333')
		.setTimestamp()
		.setFooter(
			`User: ${guild.owner.user.username} • Created by: PraveshK`,
			client.user.displayAvatarURL()
		);
	guild.owner.user.send(Welcome);
};

export const name: string = 'guildCreate';
