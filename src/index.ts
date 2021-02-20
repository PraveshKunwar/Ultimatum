import { Ultimatum } from './discord';
require('dotenv').config();

const token = process.env.BOT_TOKEN;

new Ultimatum().StartClient(token);
