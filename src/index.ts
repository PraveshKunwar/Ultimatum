import { StartClient } from './client/discord';
require('dotenv').config();

StartClient(process.env.BOT_TOKEN);
