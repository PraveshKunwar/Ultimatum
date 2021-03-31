import { Ultimatum } from './client';
require('dotenv').config();

const token = process.env.BOT_TOKEN;

const bot = new Ultimatum();
bot.StartClient(token);

export default bot;
