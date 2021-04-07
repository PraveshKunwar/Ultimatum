import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import util from 'util';
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const makeDirAsync = util.promisify(fs.mkdir);

interface Questions {
	name: string;
	type: string;
	message: string;
	choices: string[];
}

(async (): Promise<void> => {
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
	const base = '/src';
	const questions: Questions[] = [
		{
			name: 'checks',
			type: 'list',
			message: 'Which language would you like to make the template for?',
			choices: ['Javascript', 'Typescript'],
		},
	];
	const { checks } = await inquirer.prompt(questions);
	if (checks === 'Typescript') {
		try {
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
						path.join(process.cwd(), base, 'tsconfig.json'),
						readTsconfig
					);
					if (!fs.existsSync(path.join(process.cwd(), 'interfaces'))) {
						makeDirAsync(path.join(process.cwd(), base + '/interfaces'))
							.then(async (res: void) => {
								await writeFileAsync(
									path.join(process.cwd(), base + '/interfaces', 'Command.ts'),
									readCommandType
								);
								await writeFileAsync(
									path.join(process.cwd(), base + '/interfaces', 'Event.ts'),
									readEventType
								);
							})
							.catch((err) => {
								if (err) console.error(err);
							});
					}
				});
			}
		} catch (e) {
			if (e) console.error(e);
		}
	}
})();
