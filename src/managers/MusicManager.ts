import {
	Guild,
	Message,
	MessageEmbed,
	MessageReaction,
	User,
	VoiceConnection,
} from 'discord.js';
import { Ultimatum } from '../client';
import { GuildMusicSongs, GuildQueue } from '../interfaces/MusicInterface';
import ytdl from 'ytdl-core';
import fetch from 'node-fetch';
import { millisToMS } from '../utils/utils';

class MusicManager {
	public queue: Map<string, GuildQueue> = new Map();
	public client: Ultimatum;
	public dispatcher: VoiceConnection;
	public play(msg: Message, songs: GuildMusicSongs): Promise<Message> {
		const guildQueue = this.queue.get(msg.guild.id);

		if (!songs) {
			guildQueue.vc.leave();
			this.queue.delete(msg.guild.id);
			const DC = new MessageEmbed()
				.setDescription(`❯ Finished queue of songs. 🎵`)
				.setColor('#333')
				.setFooter('\u3000'.repeat(10));
			return guildQueue.channel
				.send(DC)
				.then(async (msg) => await msg.delete({ timeout: 5000 }));
		}
		this.dispatcher = guildQueue.connection;

		this.dispatcher
			.on('disconnect', () => {
				this.queue.delete(msg.guild.id);
				const DC = new MessageEmbed()
					.setDescription(`❯ Left vc and deleted queue. 🎵`)
					.setColor('#333')
					.setFooter('\u3000'.repeat(10));
				return guildQueue.channel
					.send(DC)
					.then(async (msg) => await msg.delete({ timeout: 5000 }));
			})
			.play(ytdl(songs.url))
			.on('finish', () => {
				guildQueue.songs.shift();
				this.play(msg, guildQueue.songs[0]);
			})
			.on('error', (err: Error) => {
				console.log(err);
			});
		const PlayingEmbed = new MessageEmbed()
			//@ts-ignore
			.setThumbnail(songs.img)
			.setDescription(`➤ **${songs.title}** is now playing. 🎶`)
			.setColor('#333');
		guildQueue.channel.send(PlayingEmbed);
	}
	public getQueue(msg: Message) {
		return this.queue.get(msg.guild.id);
	}
	public async stop(msg: Message): Promise<void> {
		const Stop = new MessageEmbed()
			.setDescription(
				`❯ Are you sure you want me to leave? If I leave, the queue will also be terminated. \n\n1. React with 👍 if you want me to leave. \n\n 2. React with 👎 if you want me to stay. \n\n **You have 15 seconds to react. 🎶**`
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
					if (sendit.deletable) {
						sendit.delete();
					}
					this.queue.get(msg.guild.id).vc.leave();
				} else if (reaction.emoji.name === '👎') {
					if (sendit.deletable) {
						sendit.delete();
					}
					const DC = new MessageEmbed()
						.setDescription(
							`❯ Continuing to play **${
								this.queue.get(msg.guild.id).songs[0].title
							}.** 🎵`
						)
						.setColor('#333')
						.setFooter('\u3000'.repeat(10));
					this.queue
						.get(msg.guild.id)
						.channel.send(DC)
						.then(async (msg) => await msg.delete({ timeout: 5000 }));
				}
			})
			.catch(async (collected) => {
				if (sendit.deletable) {
					sendit.delete();
				}
				const DC = new MessageEmbed()
					.setDescription(
						`❯ No one reacted, continuing to play **${
							this.queue.get(msg.guild.id).songs[0].title
						}.** 🎵`
					)
					.setColor('#333')
					.setFooter('\u3000'.repeat(10));
				this.queue
					.get(msg.guild.id)
					.channel.send(DC)
					.then(async (msg) => await msg.delete({ timeout: 5000 }));
			});
	}

	public async skip(msg: Message) {
		const DC = new MessageEmbed()
			.setDescription(
				`❯ Skipping **${this.queue.get(msg.guild.id).songs[0].title}.** 🎵`
			)
			.setColor('#333')
			.setFooter('\u3000'.repeat(10));
		this.queue
			.get(msg.guild.id)
			.channel.send(DC)
			.then(async (msg) => await msg.delete({ timeout: 5000 }));
		this.queue.get(msg.guild.id).connection.dispatcher.end();
	}
	public async lyrics(msg: Message) {
		const lyrics = await fetch(
			`https://api.lyrics.ovh/v1/${
				this.queue.get(msg.guild.id).songs[0].author.name
			}/${this.queue.get(msg.guild.id).songs[0].title}`
		);
	}
	public async pause(msg: Message) {
		const currentTime = this.queue.get(msg.guild.id).connection.dispatcher
			.streamTime;
		this.queue.get(msg.guild.id).connection.dispatcher.pause(true);
		const PausedEmbed = new MessageEmbed()
			.setDescription(
				`➤ **${
					this.queue.get(msg.guild.id).songs[0].title
				}** is now paused. Paused at: ${millisToMS(currentTime)} minutes. 🎶`
			)
			.setColor('#333');
		this.queue
			.get(msg.guild.id)
			.channel.send(PausedEmbed)
			.then(async (msg) => await msg.delete({ timeout: 5000 }));
	}
	public async resume(msg: Message) {
		if (this.queue.get(msg.guild.id).connection.dispatcher.paused === false) {
			const Error = new MessageEmbed()
				.setDescription(
					`➤ **${
						this.queue.get(msg.guild.id).songs[0].title
					}** is currently playing. Cannot resume track. 🎶`
				)
				.setColor('#333');
			this.queue
				.get(msg.guild.id)
				.channel.send(Error)
				.then(async (msg) => await msg.delete({ timeout: 5000 }));
		} else {
			this.queue.get(msg.guild.id).connection.dispatcher.resume();
			const ResumeEmbed = new MessageEmbed()
				.setDescription(
					`➤ **${
						this.queue.get(msg.guild.id).songs[0].title
					}** has been resumed. 🎶`
				)
				.setColor('#333');
			this.queue
				.get(msg.guild.id)
				.channel.send(ResumeEmbed)
				.then(async (msg) => await msg.delete({ timeout: 5000 }));
		}
	}
	public async nowplaying(msg: Message) {
		const ResumeEmbed = new MessageEmbed()
			//@ts-ignore
			.setThumbnail(this.queue.get(msg.guild.id).songs[0].img)
			.setDescription(
				`➤ **${this.queue.get(msg.guild.id).songs[0].title}** is now playing. 
				Progress: ${millisToMS(
					this.queue.get(msg.guild.id).connection.dispatcher.streamTime
				)} / ${this.queue.get(msg.guild.id).songs[0].timestamp}. 🎶`
			)
			.setColor('#333');
		this.queue.get(msg.guild.id).channel.send(ResumeEmbed);
	}
}

export { MusicManager };
