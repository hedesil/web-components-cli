import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import * as inquirer from 'inquirer'
import {ConfigProject} from "../models/interfaces";

export let configProject: ConfigProject = {
  projectType: ''
};

export default class NewProject extends Command {
  static description = 'Add new project based on Angular 7 and Web Components standard';

  static flags = {
    help: flags.help({char: 'h'})
  };

  async run() {
    const {args, flags} = this.parse(NewProject);
    this.printBanner();
    await this.askProjectType();
  }

  private printBanner() {
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
  }

  private askProjectType(): void {
    const questions = [
      {
        type: 'list',
        name: 'projectType',
        message: '¿Necesitas una nueva SPA o un componente?',
        choices: ['SPA', 'WebComponent'],
        filter: function (val: any) {
          return val.toUpperCase();
        }
      }
    ];
    inquirer.prompt<ConfigProject>(questions)
      .then(answer => {
          configProject = answer;
          switch (configProject.projectType) {
            case 'SPA':
              this.log('Se va a crear un arquetipo de aplicación en Angular 7');
              this.askAngularAppConfig()
              break;
            case 'WEBCOMPONENT':
              this.log('Se va a crear un arquetipo de web component basado en Angular 7');
              this.askComponentType();
          }
        }
      )
  }

  private askComponentType(): void {
    const questions = [
      {
        type: 'list',
        name: 'componentType',
        message: 'Se han definido tres tipos de web components: Componentes de UI (visuales básicos), componentes de ' +
          'acceso a APIs (llamadas a backend) y componentes de negocio (funcionalidad de la historia de usuario que ' +
          'utiliza dos o más de los anteriores).',
        choices: ['WC UI', 'WC ACCESO APIs', 'WC Negocio'],
        filter: function (val: any) {
          return val.toUpperCase();
        }
      }
    ];
    inquirer.prompt<ConfigProject>(questions)
      .then(answer => {
          configProject = answer;
          switch (configProject.projectType) {
            case 'SPA':
              this.log('Se va a crear un arquetipo de aplicación en Angular 7');
              break;
            case 'WEBCOMPONENT':
              this.log('Se va a crear un arquetipo de web component basado en Angular 7');
          }
          // if(configProject.projectType == 'SPA'){
          //   this.log('Se va a crear un arquetipo para ')
          // } else {
          //   this.log('hay que comparar con comillas')
          // }
        }
      )
  }

  private askAngularAppConfig(): void {
        this.log(chalk.bold.red('Esta funcionalidad se encuentra en desarrollo. Disculpa las molestias.'))
  }
}
