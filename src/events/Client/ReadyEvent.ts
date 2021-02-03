import { Run } from '../../interfaces/Evts';

export const run: Run = async (client) => {
	client.Logger.success(`${client.user.tag} is online baby.`);
};

export const Name: string = 'ready';
