import inquirer from 'inquirer'
import chalk from 'chalk'
// import ora from 'ora'

import { questions } from './questions'
import { Application } from './cli'
// const spinner = ora("Loading...")

async function main() {
    const res = await inquirer.prompt(questions)
    // spinner.start()
    
    const Dirname = __dirname

    const app = new Application(
        res.appName,
        res.backFramework,
        res.language,
        res.database,
        Dirname
    );
    

    // spinner.stop()
    await app.createAppDir()
    await app.createPackageJsonFile()
    await app.createTsEnvironment()
    await app.installDependencies()
    

    
    console.log(chalk.yellow.bgRed.bold('Installing'))
    
}

main()
