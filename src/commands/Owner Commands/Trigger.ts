import { Run } from '../../interfaces/Command';
import { MessageAttachment } from 'discord.js';
import Canvas from 'canvas';

export const run: Run = async (client, message, args, prefix) => {
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const bkground = await Canvas.loadImage('../../static/test.png');
	ctx.drawImage(bkground, 0, 0, canvas.width, canvas.height);
	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-test');

	message.channel.send(`test`, attachment);
};

export const name: string = 'trigger';
export const category: string = 'owner';
export const desc: string = 'Trigger test.';
export const perms: string[] = ['BOT_OWNER'];
