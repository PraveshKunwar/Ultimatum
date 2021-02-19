import { StartClient } from './discord';
require('dotenv').config();

StartClient(process.env.BOT_TOKEN);
