import { Token } from './interfaces/Token';
import * as File from '../token.json';
import Bot from './config/Bot';
const BotConfig: Token = File;
new Bot().start(BotConfig);
