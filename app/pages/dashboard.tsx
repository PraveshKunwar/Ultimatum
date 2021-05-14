import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { URLS } from '../glob.types';
import axios, { AxiosResponse } from 'axios';
import { User } from '../interfaces/User';
import { Guild } from '../interfaces/Guild';
import UserComponent from '../components/UserComponent';
import GuildsComponent from '../components/GuildsComponent';
interface Props {
	token: { token_type: string; token: string };
}

interface Token {
	token_type: string;
	token: string;
}

export const Dashboard: NextPage<Props> = ({ token }: Props): JSX.Element => {
	const router = useRouter();

	const getData = async (token: Token) => {
		const res: AxiosResponse<User> = await axios.get(URLS.USER, {
			headers: {
				Authorization: `${token.token_type} ${token.token}`,
			},
		});
		const guilds: AxiosResponse<Guild[]> = await axios.get(URLS.GUILDS, {
			headers: {
				Authorization: `${token.token_type} ${token.token}`,
			},
		});
		setGuilds(guilds.data);
		setUser(res.data);
	};
	const [user, setUser] = useState<User | null>(null);
	const [guilds, setGuilds] = useState<Guild[] | null>(null);
	useEffect(() => {
		if (!token) {
			router.push('/');
		} else {
			getData(token);
		}
	}, []);
	return (
		<div className="dashboard">
			{user !== null ? (
				<div className="welcome-dashboard">
					<img
						src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`}
					/>
					<button
						onClick={() => {
							router.push('/api/logout');
						}}
					>
						logout
					</button>
					<UserComponent user={user} />
					<GuildsComponent guild={guilds} />
					<br></br>
				</div>
			) : (
				false
			)}
		</div>
	);
};

export default Dashboard;
