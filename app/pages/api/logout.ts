import { NextApiResponse, NextApiRequest } from 'next';
import { setCookie } from 'nookies';
import { scopes, URLS } from '../../glob.types';
import { encode } from '../../util/util.glob';
require('dotenv').config();

export default async function logout(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = req.cookies.token;

	await fetch('https://discord.com/api/oauth2/token/revoke', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: encode({
			token: token,
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
		}),
	});
	setCookie({ res }, 'token', '', {
		expires: new Date(Date.now()),
		httpOnly: true,
		path: '/',
	});
	return res.redirect('/');
}
