import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS } from '../../glob.types';
import nookies from 'nookies';
import axios from 'axios';
require('dotenv').config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const code = req.query.code as string;
	const SCOPES = ['identify', 'email', 'connections'];
	const data = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: encodeURIComponent('http://localhost:3000/'),
		code,
		scope: SCOPES.join('%20'),
	};

	await fetch(URLS.TOKEN, {
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
			scope: 'identify',
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			res.send(data);
		})
		.catch(console.error);
};
