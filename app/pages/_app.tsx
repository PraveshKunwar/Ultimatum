import { AppProps } from 'next/app';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';
import Theme from '../components/Theme';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<Theme />
			<Component {...pageProps} />
		</ChakraProvider>
	);
};

export default App;
