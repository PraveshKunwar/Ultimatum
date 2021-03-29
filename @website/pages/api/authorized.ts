import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import btoa from 'btoa';
import { auths } from '../../utils/util';
require('dotenv').config();

export default function (req: NextApiRequest, res: NextApiResponse) {
	const code = req.query.code; // code returned from auth.
	axios
		.post(`${auths.token}?grant_type=authorization_code&code=${code}`, {
			headers: {
				Authorization: `Basic ${btoa(
					`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
				)}`,
			},
		})
		.then((res: AxiosResponse) => {
			console.log(res.data);
		})
		.catch(console.error);
}
