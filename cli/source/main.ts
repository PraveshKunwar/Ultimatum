import inquirer from "inquirer"
import path from "path"
import fs from "fs"
import util from "util";
const writeFileAsync = util.promisify(fs.writeFile)
const readFileAsync = util.promisify(fs.readFile);

interface Questions {
    name: string,
    type: string,
    message: string,
    choices: string[]
}

(async():Promise<void> => {
    const client = path.join(process.cwd(), "source" ,"pkg", "typescript", "Client.ts")
    const read = await (await readFileAsync(client, {encoding: null})).toString()
    const questions: Questions[] = [
        {   
            name: "checks",
            type: "list",
            message: "Which language would you like to make the template for?",
            choices: ["Javascript", "Typescript"]
        }
    ]
    const {checks} = await inquirer.prompt(questions)
    if(checks === "Typescript"){
     await writeFileAsync(path.join(process.cwd(), "Client.ts"), read)
    }
})()