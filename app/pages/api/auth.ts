import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS } from '../../glob.types';
require('dotenv').config();


export default function auth(req: NextApiRequest, res: NextApiResponse) {
	res.redirect(
		`${URLS.BASE}?client_id=${
			process.env.CLIENT_ID
		}&redirect_uri=${encodeURIComponent(
			'http://localhost:3000/api/authorized'
		)}&response_type=code&scope=identify`
	);
}
