import { Ultimatum } from '../../client';
import { Run } from '../../interfaces/Event';

export const run: Run = async (client) => {
	client.user?.setPresence({
		activity: {
			name: 'to ult!help',
			type: 'LISTENING',
		},
		status: 'dnd',
	});
	console.log(`${client.user?.tag} has logged on.`);
};

export const name: string = 'ready';
