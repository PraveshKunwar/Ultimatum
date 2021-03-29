import { NextApiRequest, NextApiResponse } from 'next';
import { auths, scopes } from '../../utils/util';

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

require('dotenv').config();

export default function auth(req: NextApiRequest, res: NextApiResponse) {
	res.redirect(
		`${auths.base}?client_id=${process.env.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauthorized&response_type=code&scope=identify`
	);
}
