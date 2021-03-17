import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import Colors from '../../util/Colors';
import axios, { AxiosResponse } from 'axios';
import { MessageEmbed } from 'discord.js';
import GuildModel from '../../models/GuildModel';

export const run: Run = async (client, message, args, prefix) => {
	const username = args.join(' ');

	if (!username) {
		const Error = ErrorEmbed(
			`➤ Please make sure you have the following requirements: \n **🔰 Make sure that the user *exists* on Github!** \n**🔰 Input a user for me to search!**`,
			client,
			message
		);
		message.channel.send(Error);
	} else {
		axios
			.get(`https://api.github.com/users/${username}`)
			.then((res: AxiosResponse) => {
				if (res.status === 200) {
					const date = new Date(Date.parse(res.data.created_at));
					const month = date.getMonth() + 1;
					const day = date.getDate();
					const year = date.getFullYear();
					const GithubProfile = new MessageEmbed()
						.setColor(Colors.github_color_palette)
						.setTimestamp()
						.setTitle('🕵️ Github Profile')
						.setAuthor(client.user?.tag, client.user?.displayAvatarURL())
						.setThumbnail(res.data.avatar_url)
						.setFooter(
							`User: ${message.author?.tag} • Created by: PraveshK`,
							message.author.displayAvatarURL()
						)
						.setDescription(
							`Github Profile displayed for user **${username}**.`
						)
						.addFields(
							{
								name: '⭐ Bio',
								value: res.data.bio === null ? 'No Bio!' : res.data.bio,
							},
							{
								name: '⭐ Followers',
								value: res.data.followers,
								inline: true,
							},
							{
								name: '⭐ Following',
								value: res.data.following,
								inline: true,
							},
							{ name: '⭐ Location', value: res.data.location, inline: true },
							{
								name: '⭐ Repos',
								value: res.data.public_repos,
								inline: true,
							},
							{
								name: '⭐ Account created at:',
								value: `${month}/${day}/${year}`,
								inline: true,
							},
							{
								name: `⭐ Link to Github profile`,
								value: `[${username}'s Link](${res.data.html_url})`,
								inline: true,
							}
						);
					message.channel.send(GithubProfile).then(async (msg) => {
						await msg.react('❤️');
					});
				}
			});
	}
};

export const name: string = 'github';
export const category: string = 'profile';
export const desc: string = 'Check someones Github profile out.';
export const aliases: string[] = ['git'];