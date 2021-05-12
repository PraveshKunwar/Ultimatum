import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import nookies from 'nookies';
import { useState } from 'react';
import { useEffect } from 'react';
import { URLS } from '../glob.types';
import { User } from '../interfaces/User';

interface Props {
	token: { [key: string]: string };
}

export const Dashboard: NextPage<Props> = ({ token }: Props): JSX.Element => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (!token) {
			router.push('/');
		}
		(async () => {
			await fetch(URLS.USER, {
				headers: {
					Authorization: `${token.token_type} ${token.token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => setUser(data));
		})();
	}, [user]);
	return (
		<div className="dashboard">
			{!token || typeof user === null ? (
				router.push('/api/auth')
			) : (
				<div className="welcome-dashboard">
					Welcome {user.id}
					<button
						onClick={() => {
							router.push('/api/logout');
						}}
					>
						button
					</button>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
