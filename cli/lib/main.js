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
const ora_1 = __importDefault(require("ora"));
const writeFileAsync = util_1.default.promisify(fs_1.default.writeFile);
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
const makeDirAsync = util_1.default.promisify(fs_1.default.mkdir);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'Client.ts');
    const Command = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'interfaces', 'Command.ts');
    const Event = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'interfaces', 'Event.ts');
    const Package = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'package.json');
    const Tsconfig = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'tsconfig.json');
    const README = path_1.default.join(process.cwd(), 'source', 'pkg', 'typescript', 'README.md');
    const readClient = yield (yield readFileAsync(client, { encoding: null })).toString();
    const readCommandType = yield (yield readFileAsync(Command, { encoding: null })).toString();
    const readEventType = yield (yield readFileAsync(Event, { encoding: null })).toString();
    const readPackage = yield (yield readFileAsync(Package, { encoding: null })).toString();
    const readTsconfig = yield (yield readFileAsync(Tsconfig, { encoding: null })).toString();
    const readMe = yield (yield readFileAsync(README, { encoding: null })).toString();
    const base = '/src';
    const questions = [
        {
            name: 'checks',
            type: 'list',
            message: 'Which language would you like to make the template for?',
            choices: ['Javascript', 'Typescript'],
        },
    ];
    const { checks } = yield inquirer_1.default.prompt(questions);
    if (checks === 'Typescript') {
        const spinner = ora_1.default('Creating packages...').start();
        try {
            if (!fs_1.default.existsSync(path_1.default.join(process.cwd(), base))) {
                makeDirAsync(path_1.default.join(process.cwd(), base)).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield writeFileAsync(path_1.default.join(process.cwd(), base, 'Client.ts'), readClient);
                    yield writeFileAsync(path_1.default.join(process.cwd(), base, 'package.json'), readPackage);
                    yield writeFileAsync(path_1.default.join(process.cwd(), base, 'README.md'), readMe);
                    yield writeFileAsync(path_1.default.join(process.cwd(), base, 'tsconfig.json'), readTsconfig);
                    if (!fs_1.default.existsSync(path_1.default.join(process.cwd(), 'interfaces'))) {
                        makeDirAsync(path_1.default.join(process.cwd(), base + '/interfaces'))
                            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                            yield writeFileAsync(path_1.default.join(process.cwd(), base + '/interfaces', 'Command.ts'), readCommandType);
                            yield writeFileAsync(path_1.default.join(process.cwd(), base + '/interfaces', 'Event.ts'), readEventType);
                            setTimeout(() => {
                                spinner.color = 'yellow';
                                spinner.text = 'Almost done...';
                                spinner.stop();
                            }, 10000);
                        }))
                            .catch((err) => {
                            if (err)
                                console.error(err);
                        });
                    }
                }));
            }
        }
        catch (e) {
            if (e)
                console.error(e);
        }
    }
}))();
