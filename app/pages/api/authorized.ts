import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS } from '../../glob.types';
import nookies from 'nookies';
import { encode, TokenData } from '../../util/util.glob';
require('dotenv').config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const code = req.query.code as string;
	const data = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: 'http://localhost:3000/api/authorized',
		code,
		scope: 'identify guilds email',
	};
	if (!code) {
		res.redirect(`/error?error=${encodeURIComponent('No code was given.')}`);
	}
	const token = await fetch(URLS.TOKEN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: encode(data),
	});
	const recievedData: TokenData = await token.json();
	if (!recievedData.access_token) {
		res.redirect(
			`/error?error=${encodeURIComponent(
				'No access token was provided. Please try again later.'
			)}`
		);
	}
	nookies.set({ res }, 'token', recievedData.access_token, {
		expires: new Date(Date.now() + 5000),
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
	});
	nookies.set({ res }, 'token_type', recievedData.token_type, {
		expires: new Date(Date.now() + recievedData.expires_in * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
	});
	res.redirect('/');
};
