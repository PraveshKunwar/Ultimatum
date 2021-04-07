import { BotName } from '../Client';
import { Run } from '../interfaces/Event';

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

//check out discord docs for event names. The event handler is based off the event name that is passed here, not the name of the file.
export const name: string = 'ready';
