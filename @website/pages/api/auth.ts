import { NextApiRequest, NextApiResponse } from 'next';

type Scopes = Array<string>;
const SCOPE: Scopes = [
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
	'webook.incoming',
	'messages.read',
	'relationships.read',
];

require('dotenv').config();
