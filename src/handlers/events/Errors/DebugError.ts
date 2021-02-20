import { Run } from '../../../interfaces/Event';

export const run: Run = async (client, message, guild, err) => {
	console.error(`Debug Error: ${err}`);
};

export const name: string = 'debug';
