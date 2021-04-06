import inquirer from "inquirer";
import { resolve } from "node:path";
import ora from "ora"


const prompt = async(): Promise<void> => {
    await inquirer.prompt([
    {
         type: 'list',
      name: 'reptile',
      message: 'Which is better?',
      choices: ['alligator', 'crocodile'],
    }
]).then(res => {console.log(res.reptile
    )})
}

const spin = async():Promise<void> => {
     const spinner = ora();
  spinner.start('Spinning');
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            spinner.succeed()
            resolve()
        }, 10000);
    })
}

const init = async(): Promise<void> => {
    await prompt()
    await spin();
    console.log("DONE")
}

init()