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
	const client: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'Client.ts'
	);
	const Command: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'interfaces',
		'Command.ts'
	);
	const Event: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'interfaces',
		'Event.ts'
	);
	const Package: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'package.json'
	);
	const Tsconfig: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'tsconfig.json'
	);
	const README: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'README.md'
	);
	const Message: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'events',
		'Message.ts'
	);
	const Ready: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'events',
		'Ready.ts'
	);
	const index: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'index.ts'
	);
	const Ping: string = path.join(
		process.cwd(),
		'source',
		'pkg',
		'typescript',
		'commands',
		'Other Commands',
		'Ping.ts'
	);
	const readClient = await (
		await readFileAsync(client, { encoding: null })
	).toString();
	const readCommandType = await (
		await readFileAsync(Command, { encoding: null })
	).toString();
	const readEventType = await (
		await readFileAsync(Event, { encoding: null })
	).toString();
	const readPackage = await (
		await readFileAsync(Package, { encoding: null })
	).toString();
	const readTsconfig = await (
		await readFileAsync(Tsconfig, { encoding: null })
	).toString();
	const readMe = await (
		await readFileAsync(README, { encoding: null })
	).toString();
	const readMessage = await (
		await readFileAsync(Message, { encoding: null })
	).toString();
	const readReady = await (
		await readFileAsync(Ready, { encoding: null })
	).toString();
	const readIndex = await (
		await readFileAsync(index, { encoding: null })
	).toString();
	const readPing = await (
		await readFileAsync(Ping, { encoding: null })
	).toString();
	const base = '/src';
	const questions: Questions[] = [
		{
			name: 'checks',
			type: 'list',
			message: 'Which language would you like to make the template for?',
			choices: ['Javascript', 'Typescript'],
		},
	];

	program
		.command('help')
		.description('Get help on how to use this tool.')
		.action(() => {
			console.log(
				'You can do: \n\n ts-djs-create typescript \n\n This creates a Typescript template, or you can do: \n\n: ts-djs-create javascript\n\n This creates a Javascript Template.'
			);
		});

	program
		.command('typescript')
		.alias('ts')
		.description('Create Typescript template')
		.action(() => {
			const spinner = ora('Creating packages...').start();
			if (!fs.existsSync(path.join(process.cwd(), base))) {
				makeDirAsync(path.join(process.cwd(), base)).then(async (res: void) => {
					await writeFileAsync(
						path.join(process.cwd(), base, 'Client.ts'),
						readClient
					);

					await writeFileAsync(
						path.join(process.cwd(), base, 'package.json'),
						readPackage
					);
					await writeFileAsync(
						path.join(process.cwd(), base, 'README.md'),
						readMe
					);
					await writeFileAsync(
						path.join(process.cwd(), base, 'tsconfig.json'),
						readTsconfig
					);
					if (!fs.existsSync(path.join(process.cwd(), base, 'interfaces'))) {
						makeDirAsync(path.join(process.cwd(), base, 'interfaces'))
							.then(async (res: void) => {
								await writeFileAsync(
									path.join(process.cwd(), base, 'interfaces', 'Command.ts'),
									readCommandType
								);
								await writeFileAsync(
									path.join(process.cwd(), base, 'interfaces', 'Event.ts'),
									readEventType
								);
							})
							.catch((err) => {
								if (err) console.error(err);
							});
						if (!fs.existsSync(path.join(process.cwd(), base, 'events'))) {
							makeDirAsync(path.join(process.cwd(), base + '/events')).then(
								async (res: void) => {
									await writeFileAsync(
										path.join(process.cwd(), base, 'events', 'Message.ts'),
										readMessage
									);
									await writeFileAsync(
										path.join(process.cwd(), base, 'events', 'Ready.ts'),
										readReady
									);
								}
							);
						}
						if (!fs.existsSync(path.join(process.cwd(), base, 'commands'))) {
							makeDirAsync(path.join(process.cwd(), base, 'commands')).then(
								(res: void) => {
									if (
										!fs.existsSync(
											path.join(
												process.cwd(),
												base,
												'commands',
												'Other Commands'
											)
										)
									) {
										makeDirAsync(
											path.join(
												process.cwd(),
												base,
												'commands',
												'Other Commands'
											)
										).then(async (res: void) => {
											await writeFileAsync(
												path.join(
													process.cwd(),
													base,
													'commands',
													'Other Commands',
													'Ping.ts'
												),
												readPing
											);
										});
									}
								}
							);
						}
						setTimeout(() => {
							spinner.color = 'yellow';
							spinner.text = 'Almost done...';
							spinner.stop();
						}, 5000);
					}
				});
			}
		});
	program.parse(process.argv);
})();
