import { NextPage } from 'next';
import Head from 'next/head';
import Login from '../components/Login';

const Index: NextPage = () => {
	return (
		<div className="main">
			<Head>
				<meta charSet="utf-8" />
				<meta name="author" content="Pravesh K." />
				<meta name="keywords" content="Ultimatum Website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="The official website for Ultimatum" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
					rel="stylesheet"
				/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
					integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
				/>
				<script src="https://unpkg.com/react/umd/react.production.min.js"></script>

				<script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>

				<script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
			</Head>
			<Login />
		</div>
	);
};

export default Index;
