import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS } from '../../glob.types';
require('dotenv').config();

export default (req: NextApiRequest, res: NextApiResponse) => {
	const code = req.query.code;
	res.send(code);
};
