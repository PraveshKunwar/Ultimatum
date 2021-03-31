import Head from 'next/head';

export default function Index() {
	return (
		<div className="#home">
			<Head>
				<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="The official website for Ultimatum. The all in one Discord bot."
				/>
				<meta name="author" content="Pravesh Kunwar" />
				<title>Ultimatum | Welcome</title>
			</Head>
		</div>
	);
}
