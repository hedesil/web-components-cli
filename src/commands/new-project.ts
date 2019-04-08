import {Command, flags} from '@oclif/command'
import chalk from 'chalk'

// const options = require('../configuration/options');

export default class NewProject extends Command {
  static description = 'Add new project based on Angular 7 and Web Components standard';

  static flags = {
    help: flags.help({char: 'h'})
  };

  static args = [
    {
      name: 'applicationType',
      required: false,
      description: 'Type of generated archetype'
    }
  ];

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
    const applicationType = args.applicationType;
    if (applicationType) {
      this.log(`${chalk.green('[Success]')} You choose the applicationType: ${applicationType}`)
    } else {
      this.error('please specify the new application type (SPA or Web Component')
    }
  }
}
