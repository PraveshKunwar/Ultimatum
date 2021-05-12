import { NextPage, GetServerSideProps, NextPageContext } from 'next';
import Head from 'next/head';
import Login from '../components/Login';
import nookies from 'nookies';
import { URLS } from '../glob.types';
import Dashboard from './dashboard';

interface Props {
	token: { [key: string]: string };
}

const Index: NextPage<Props> = ({ token }: Props) => {
	return (
		<div className="main">
		
			{token ? <Dashboard token={token} /> : <Login />}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);
	return {
		props: {
			token: cookies,
		},
	};
};

export default Index;
