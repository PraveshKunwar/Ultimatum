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
		console.log(token);
	}, [router]);
	return <div className="dashboard">HELLO DASHBOARD</div>;
};

export default Dashboard;
