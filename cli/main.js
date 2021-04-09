#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const commander_1 = require("commander");
const ora_1 = __importDefault(require("ora"));
const writeFileAsync = util_1.default.promisify(fs_1.default.writeFile);
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
const makeDirAsync = util_1.default.promisify(fs_1.default.mkdir);
const program = new commander_1.Command();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'Client.ts');
    const Command = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'interfaces', 'Command.ts');
    const Event = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'interfaces', 'Event.ts');
    const Package = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'package.json');
    const Tsconfig = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'tsconfig.json');
    const README = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'README.md');
    const Message = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'events', 'Message.ts');
    const Ready = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'events', 'Ready.ts');
    const index = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'index.ts');
    const Ping = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'commands', 'Other Commands', 'Ping.ts');
    const readClient = yield (yield readFileAsync(client, { encoding: null })).toString();
    const readCommandType = yield (yield readFileAsync(Command, { encoding: null })).toString();
    const readEventType = yield (yield readFileAsync(Event, { encoding: null })).toString();
    const readPackage = yield (yield readFileAsync(Package, { encoding: null })).toString();
    const readTsconfig = yield (yield readFileAsync(Tsconfig, { encoding: null })).toString();
    const readMe = yield (yield readFileAsync(README, { encoding: null })).toString();
    const readMessage = yield (yield readFileAsync(Message, { encoding: null })).toString();
    const readReady = yield (yield readFileAsync(Ready, { encoding: null })).toString();
    const readIndex = yield (yield readFileAsync(index, { encoding: null })).toString();
    const readPing = yield (yield readFileAsync(Ping, { encoding: null })).toString();
    const base = '/src';
    const questions = [
        {
            name: 'checks',
            type: 'list',
            message: 'Which language would you like to make the template for?',
            choices: ['Javascript', 'Typescript'],
        },
    ];
    program.version('1.1.1').description('Current version.');
    program
        .command('help')
        .aliases(['-help'])
        .description('Get help for usage on the CLI.')
        .action(() => {
        console.log(`//holder`);
    });
    program
        .command('init')
        .aliases(['create'])
        .description('Creates a new project template')
        .action(() => __awaiter(void 0, void 0, void 0, function* () {
        const { checks } = yield inquirer_1.default.prompt(questions);
        if (checks === 'Typescript') {
            const spinner = ora_1.default('Creating packages...').start();
            try {
                makeDirAsync(path_1.default.join(process.cwd(), base)).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield writeFileAsync(path_1.default.join(process.cwd(), base, 'Client.ts'), readClient);
                    yield writeFileAsync(path_1.default.join(process.cwd(), base, 'index.ts'), readIndex);
                    makeDirAsync(path_1.default.join(process.cwd(), base, 'interfaces'))
                        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        yield writeFileAsync(path_1.default.join(process.cwd(), base, 'interfaces', 'Command.ts'), readCommandType);
                        yield writeFileAsync(path_1.default.join(process.cwd(), base, 'interfaces', 'Event.ts'), readEventType);
                    }))
                        .catch((err) => {
                        if (err) {
                            spinner.stop();
                            console.error(err);
                        }
                    });
                    makeDirAsync(path_1.default.join(process.cwd(), base + '/events')).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                        yield writeFileAsync(path_1.default.join(process.cwd(), base, 'events', 'Message.ts'), readMessage);
                        yield writeFileAsync(path_1.default.join(process.cwd(), base, 'events', 'Ready.ts'), readReady);
                    }));
                    makeDirAsync(path_1.default.join(process.cwd(), base, 'commands')).then((res) => {
                        if (!fs_1.default.existsSync(path_1.default.join(process.cwd(), base, 'commands', 'Other Commands'))) {
                            makeDirAsync(path_1.default.join(process.cwd(), base, 'commands', 'Other Commands')).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                                yield writeFileAsync(path_1.default.join(process.cwd(), base, 'commands', 'Other Commands', 'Ping.ts'), readPing);
                            }));
                        }
                    });
                    setTimeout(() => {
                        spinner.color = 'yellow';
                        spinner.text = 'Almost done...';
                        spinner.stop();
                    }, 5000);
                }));
            }
            catch (e) {
                if (e) {
                    console.error(e);
                    spinner.stop();
                }
            }
        }
    }));
    program.parse(process.argv);
}))();
