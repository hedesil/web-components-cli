import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import * as inquirer from 'inquirer'

// const options = require('../configuration/options');

export default class NewProject extends Command {
  static description = 'Add new project based on Angular 7 and Web Components standard';

  static flags = {
    help: flags.help({char: 'h'})
  };

  async run() {
    const {args, flags} = this.parse(NewProject);

    this.log(chalk.bold.yellow(' #######  ########  ######## ##    ##     ######   #######  ##     ## ########   #######  ##    ## ######## ##    ## ########  ######'));
    this.log(chalk.bold.yellow('##     ## ##     ## ##       ###   ##    ##    ## ##     ## ###   ### ##     ## ##     ## ###   ## ##       ###   ##    ##    ##    ##'));
    this.log(chalk.bold.yellow('##     ## ##     ## ##       ####  ##    ##       ##     ## #### #### ##     ## ##     ## ####  ## ##       ####  ##    ##    ##'));
    this.log(chalk.bold.yellow('##     ## ########  ######   ## ## ##    ##       ##     ## ## ### ## ########  ##     ## ## ## ## ######   ## ## ##    ##     ######'));
    this.log(chalk.bold.yellow('##     ## ##        ##       ##  ####    ##       ##     ## ##     ## ##        ##     ## ##  #### ##       ##  ####    ##          ##'));
    this.log(chalk.bold.yellow('##     ## ##        ##       ##   ###    ##    ## ##     ## ##     ## ##        ##     ## ##   ### ##       ##   ###    ##    ##    ##'));
    this.log(chalk.bold.yellow(' #######  ##        ######## ##    ##     ######   #######  ##     ## ##         #######  ##    ## ######## ##    ##    ##     ######'));
    this.log(chalk.bold.yellow(''));
    this.log(chalk.bold.yellow('             ######   ######## ##    ## ######## ########     ###    ########  #######  ########'));
    this.log(chalk.bold.yellow('            ##    ##  ##       ###   ## ##       ##     ##   ## ##      ##    ##     ## ##     ##'));
    this.log(chalk.bold.yellow('            ##        ##       ####  ## ##       ##     ##  ##   ##     ##    ##     ## ##     ##'));
    this.log(chalk.bold.yellow('            ##   #### ######   ## ## ## ######   ########  ##     ##    ##    ##     ## ########'));
    this.log(chalk.bold.yellow('            ##    ##  ##       ##  #### ##       ##   ##   #########    ##    ##     ## ##   ##'));
    this.log(chalk.bold.yellow('            ##    ##  ##       ##   ### ##       ##    ##  ##     ##    ##    ##     ## ##    ##'));
    this.log(chalk.bold.yellow('             ######   ######## ##    ## ######## ##     ## ##     ##    ##     #######  ##     ##'));
    this.log();
    this.log();

    const questions = [
      {type: 'list', name: 'projectType', message:'Choose project type', choices: ['SPA', 'WebComponent']}
    ];
    inquirer.prompt(questions)
      .then(function(answers){
        console.log(answers)
      })
  }
}
