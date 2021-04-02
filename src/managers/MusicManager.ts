import { Guild, Message, MessageEmbed, VoiceConnection } from 'discord.js';
import { Ultimatum } from '../client';
import { GuildQueue } from '../interfaces/MusicInterface';
import ytdl from 'ytdl-core';

class MusicManager {
	public queue: Map<string, GuildQueue> = new Map();
	public client: Ultimatum;
	public dispatcher: VoiceConnection;
	public play(msg: Message, songs) {
		const guildQueue = this.queue.get(msg.guild.id);
		if (!songs) {
			guildQueue.vc.leave();
			this.queue.delete(msg.guild.id);
		}
		this.dispatcher = guildQueue.connection;

		this.dispatcher
			.on('disconnect', () => {
				this.queue.delete(msg.guild.id);
				const DC = new MessageEmbed()
					.setDescription(`❯ Left vc and deleted queue. 📝`)
					.setColor('#333')
					.setFooter('\u3000'.repeat(10));
				return guildQueue.channel.send(DC);
			})
			.play(ytdl(songs.url))
			.on('finish', () => {
				guildQueue.songs.shift();
				this.play(msg, guildQueue.songs[0]);
			})
			.on('error', (err: Error) => {
				this.queue.delete(msg.guild.id);
				const DC = new MessageEmbed()
					.setDescription(`❯ ERROR: Left vc and deleted queue. 📝`)
					.setColor('#333')
					.setFooter('\u3000'.repeat(10));
				return guildQueue.channel.send(DC);
			});
		const PlayingEmbed = new MessageEmbed()
			.setThumbnail(songs.img)
			.setDescription(`➤ Started Playing: ${songs.title}`)
			.addFields(
				{
					name: 'Url',
					value: `[Link](${songs.url})`,
					inline: true,
				},
				{
					name: 'Description',
					value: songs.desc ? songs.desc : 'No description!',
					inline: true,
				},
				{
					name: 'Timestamp',
					value: songs.timestamp
						? songs.timestamp
						: 'No timestamp provided. May be a livestream you are trying to listen!',
					inline: true,
				},
				{
					name: 'Views',
					value: songs.views ? songs.views : "Couldn't load views.",
					inline: true,
				}
			)
			.setColor('#333')
			.setTimestamp()
			.setFooter(
				`User: ${msg.author?.tag} • Created by: PraveshK`,
				msg.author.displayAvatarURL()
			);
		guildQueue.channel.send(PlayingEmbed);
	}
	public getQueue(msg: Message) {
		return this.queue.get(msg.guild.id);
	}
}

export { MusicManager };
