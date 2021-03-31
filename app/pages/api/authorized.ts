import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import {
	auths,
	DataProps,
	scopes,
	ReturnTokens,
	ReturnUser,
} from '../../utils/util';
import auth from './auth';
import store from '../../redux/store';
import { setToken } from '../../redux/actions/actions';
require('dotenv').config();

const btoa = require('btoa');

export default async function (req: NextApiRequest, res: NextApiResponse) {
	//@ts-ignore
	const code: string = req.query.code; // code returned from auth
	const SCOPES: scopes = [
		'identify',
		'email',
		'connections',
		'guilds',
		'guilds.join',
		'gdm.join',
		'rpc',
		'rpc.notifications.read',
		'rpc.voice.read',
		'rpc.voice.write',
		'rpc.activities.write',
		'messages.read',
		'relationships.read',
	];
	const data: DataProps = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: process.env.REDIRECT_URI,
		code,
		scope: SCOPES.join('%20'),
	};

	await fetch(auths.token, {
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
			scope: SCOPES.join('%20'),
		}),
	})
		.then((res) => res.json())
		.then((data: ReturnTokens) => {
			res.redirect(`/user/${data.access_token}`);
		})
		.catch(console.error);
}
