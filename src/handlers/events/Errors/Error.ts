import { Run } from '../../../interfaces/Event';

export const run: Run = async (client, message, guild, err) => {
	console.error(`Error: ${err}`);
};

export const name: string = 'error';
