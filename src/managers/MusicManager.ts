import {
	Guild,
	Message,
	MessageEmbed,
	MessageReaction,
	User,
	VoiceConnection,
} from 'discord.js';
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
			const DC = new MessageEmbed()
				.setDescription(`❯ Finished queue of songs. 🎵`)
				.setColor('#333')
				.setFooter('\u3000'.repeat(10));
			return guildQueue.channel.send(DC);
		}
		this.dispatcher = guildQueue.connection;

		this.dispatcher
			.on('disconnect', () => {
				this.queue.delete(msg.guild.id);
				const DC = new MessageEmbed()
					.setDescription(`❯ Left vc and deleted queue. 🎵`)
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
					.setDescription(`❯ ERROR: Left vc and deleted queue. 🎵`)
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
	public async stop(msg: Message) {
		const Stop = new MessageEmbed()
			.setDescription(
				`❯ Choose the following options below: \n\n **1.** If you want me to stop the bot, but leave the queue of songs the same, react with THUMBS_UP. 👍\n\n **2.** If you want me to stop the bot and delete the queue of songs, react with THUMBS_DOWN. 👎\n\n **You have 10 seconds to react.**`
			)
			.setColor('#333')
			.setFooter('\u3000'.repeat(10));
		let sendit = await msg.channel.send(Stop);
		await sendit.react('👍');
		await sendit.react('👎');
		const filter = (reaction: MessageReaction, user: User) => {
			return (
				['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id
			);
		};

		sendit
			.awaitReactions(filter, {
				max: 1,
				time: 10000,
				errors: ['time'],
			})
			.then((collected) => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					const DC = new MessageEmbed()
						.setDescription(
							`❯ Stopped playing the music, but kept the queue. 🎵`
						)
						.setColor('#333')
						.setFooter('\u3000'.repeat(10));
					this.queue.get(msg.guild.id).channel.send(DC);
					this.queue.get(msg.guild.id).vc.leave();
				} else if (reaction.emoji.name === '👎') {
					const DC = new MessageEmbed()
						.setDescription(
							`❯ Stopped playing the music, but deleted the queue. 🎵`
						)
						.setColor('#333')
						.setFooter('\u3000'.repeat(10));
					this.queue.get(msg.guild.id).channel.send(DC);
					this.queue.get(msg.guild.id).vc.leave();
					this.queue.delete(msg.guild.id);
				}
			})
			.catch(async (collected) => {
				await sendit.delete().then((msg) => {
					const DC = new MessageEmbed()
						.setDescription(
							`❯ No one reacted, continuing to play ${
								this.queue.get(msg.guild.id).songs[0].title
							}. 🎵`
						)
						.setColor('#333')
						.setFooter('\u3000'.repeat(10));
					this.queue.get(msg.guild.id).channel.send(DC);
				});
			});
	}
}

export { MusicManager };
