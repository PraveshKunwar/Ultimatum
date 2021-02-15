import { Run } from '../../interfaces/Command';
import ErrorEmbed from '../../errors/ErrorEmbed';
import BlockQuote from '../../util/BlockQuote';
import Colors from '../../util/Colors';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';

export const run: Run = async (client, message, args, prefix) => {
	const username = args.join(' ');
	if (!username) {
		const Error = ErrorEmbed(
			`Please specify a username for me to search! Also, please make sure that the user ***exists*** on Github as well! \n\n
		**Examples:**
			${BlockQuote(
				`${prefix}Github John Doe\n${prefix}Github Robert Doe
				`
			)}
		`,
			client,
			message
		);
		message.channel.send(Error);
	} else {
		axios.get(`https://api.github.com/users/${username}`).then((res: any) => {
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
				.setDescription(`Github Profile displayed for user **${username}**.`)
				.addFields(
					{
						name: '⭐ Bio',
						value: res.data.bio === null ? 'No Bio!' : res.data.bio,
					},
					{ name: '⭐ Followers', value: res.data.followers, inline: true },
					{ name: '⭐ Following', value: res.data.following, inline: true },
					{ name: '⭐ Location', value: res.data.location, inline: true },
					{ name: '⭐ Repos', value: res.data.public_repos, inline: true },
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
		});
	}
};

export const name: string = 'github';
