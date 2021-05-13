import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { URLS } from '../glob.types';
import axios from 'axios';
import { User } from '../interfaces/User';
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
		const res = await axios.get(URLS.USER, {
			headers: {
				Authorization: `${token.token_type} ${token.token}`,
			},
		});
		setUser(res.data as User);
	};
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		if (!token) {
			router.push('/');
		}

		getData(token);
	}, [getData]);
	return (
		<div className="dashboard">
			{!token ? router.push('/api/auth') : true}
			{user !== null ? (
				<div className="welcome-dashboard">
					Welcome {`${user.username}#${user.discriminator}`}
					<img
						src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`}
					/>
					<button
						onClick={() => {
							router.push('/api/logout');
						}}
					>
						button
					</button>
					{user.avatar}
				</div>
			) : (
				false
			)}
		</div>
	);
};

export default Dashboard;
