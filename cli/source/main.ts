#!/usr/bin/env node
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import util from 'util';
import ora from 'ora';
import { Command } from 'commander';
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const makeDirAsync = util.promisify(fs.mkdir);
const program = new Command();

interface Questions {
	name: string;
	type: string;
	message: string;
	choices: string[];
}

(async (): Promise<void> => {
	program
		.version('1.0.0')
		.description('Typescript or Javascript Discord JS project creator.');

	program
		.command('help')
		.description('get help')
		.action(() => {
			console.log('BOOM BOI');
		});
	program.parse(process.argv);
})();
