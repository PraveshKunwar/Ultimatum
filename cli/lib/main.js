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
const ora_1 = __importDefault(require("ora"));
const prompt = () => __awaiter(void 0, void 0, void 0, function* () {
    yield inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'reptile',
            message: 'Which is better?',
            choices: ['alligator', 'crocodile'],
        }
    ]).then(res => {
        console.log(res.reptile);
    });
});
const spin = () => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora_1.default();
    spinner.start('Spinning');
    return new Promise((resolve) => {
        setTimeout(() => {
            spinner.succeed();
            resolve();
        }, 10000);
    });
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prompt();
    yield spin();
    console.log("DONE");
});
init();
