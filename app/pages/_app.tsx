import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<meta charSet="utf-8" />
			<meta name="author" content="Pravesh K." />
			<meta name="keywords" content="Ultimatum Website" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content="The official website for Ultimatum" />

			<Component {...pageProps} />
		</>
	);
};

export default App;
