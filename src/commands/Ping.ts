import { Run } from '../interfaces/Cmds';

export const run: Run = async (client, message) => {
	const msg = await message.channel.send('YESSUH');
	await msg.edit(
		client.embed(
			{
				description: `Websocket: ${client.ws.ping}MS\nMessage edit: ${
					message.createdTimestamp - msg.createdTimestamp
				}`,
			},
			message
		)
	);
};

export const Name: string = 'ping';
