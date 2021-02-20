import { Ultimatum } from '../../discord';
import { Run } from '../../interfaces/Event';
import MongoInit from '../../functions/Mongoose';

export const run: Run = async (client) => {
	MongoInit();
	client.user?.setPresence({
		activity: {
			name: `Looking over ${client.users.cache.size} people!`,
			type: 'CUSTOM_STATUS',
		},
		status: 'dnd',
	});
	console.log(`${client.user?.tag} has logged on.`);
};

export const name: string = 'ready';
