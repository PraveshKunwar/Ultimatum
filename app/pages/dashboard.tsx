import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import nookies from 'nookies';
import { useEffect } from 'react';
import { URLS } from '../glob.types';

interface Props {
	token: { [key: string]: string };
}

export const Dashboard: NextPage<Props> = ({ token }: Props) => {
	const router = useRouter();
	useEffect(() => {
		if (!token) {
			router.push('/');
		}
	}, [router]);
	return (
		<div className="dashboard">
			{!token ? false : <div className="welcome-dashboard">HI</div>}
		</div>
	);
};

export default Dashboard;
