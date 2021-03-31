import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { NextPage } from 'next';

interface Props {
	Component: any;
	pageProps: any;
}

const App: NextPage<Props> = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};
