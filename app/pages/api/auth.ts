import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS } from '../../glob.types';
require('dotenv').config();

export default function auth(req: NextApiRequest, res: NextApiResponse) {
	res.redirect(
		`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauthorized&response_type=code&scope=identify%20email%20connections%20guilds%20activities.read%20activities.write%20messages.read&prompt=consent`
	);
}
