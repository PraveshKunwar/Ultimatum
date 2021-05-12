import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS } from '../../glob.types';
import nookies from 'nookies';
import axios from 'axios';
import { resolveSoa } from 'node:dns';
require('dotenv').config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const code = req.query.code as string;
	const data = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: encodeURIComponent('http://localhost:3000/api/authorized'),
		code,
	};
	if (!code) {
		res.redirect(`/error?error=${encodeURIComponent('No code was given.')}`);
	}
	const token = await fetch(
		`${URLS.TOKEN}?grant_type=authorization_code&code=${code}&redirect_uri=${data.redirect_uri}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: data.client_id,
				client_secret: data.client_secret,
				grant_type: data.grant_type,
				code: code,
				redirect_uri: data.redirect_uri,
				scope: encodeURIComponent('identify guilds'),
			}),
		}
	);
	const recievedData = await token.json();
	res.send(recievedData);
};
