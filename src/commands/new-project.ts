import {Command, flags} from '@oclif/command';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import {stdout} from 'execa';
import * as execa from 'execa';
import * as Listr from 'listr';
import {ConfigProject} from "../models/interfaces";
import {ConfigWebComponent} from "../models/interfaces";
import {config} from "rxjs";

export let configProject: ConfigProject = {
  projectType: ''
};

export let configWebComponent: ConfigWebComponent = {
  componentType: 'string',
  componentName: '',
  componentDescription: ''
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
    // this.log(chalk.bold.yellow(''));
    // this.log(chalk.bold.yellow('             ######   ######## ##    ## ######## ########     ###    ########  #######  ########'));
    // this.log(chalk.bold.yellow('            ##    ##  ##       ###   ## ##       ##     ##   ## ##      ##    ##     ## ##     ##'));
    // this.log(chalk.bold.yellow('            ##        ##       ####  ## ##       ##     ##  ##   ##     ##    ##     ## ##     ##'));
    // this.log(chalk.bold.yellow('            ##   #### ######   ## ## ## ######   ########  ##     ##    ##    ##     ## ########'));
    // this.log(chalk.bold.yellow('            ##    ##  ##       ##  #### ##       ##   ##   #########    ##    ##     ## ##   ##'));
    // this.log(chalk.bold.yellow('            ##    ##  ##       ##   ### ##       ##    ##  ##     ##    ##    ##     ## ##    ##'));
    // this.log(chalk.bold.yellow('             ######   ######## ##    ## ######## ##     ## ##     ##    ##     #######  ##     ##'));
    this.log();
    this.log();
  }

  private askProjectType(): void {
    const questions = [
      {
        type: 'list',
        name: 'projectType',
        message: '¿Quieres crear una nueva SPA o un nuevo componente?',
        choices: ['SPA', 'Componente'],
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
              this.askAngularAppConfig();
              break;
            case 'COMPONENTE':
              this.log('Se va a crear un arquetipo de web component basado en Angular 7');
              this.askComponentType();
          }
        }
      )
      .catch(error => {
        this.log('Ha ocurrido un error inesperado.');
      })
  }

  private askComponentType() {
    const questions = [
      {
        type: 'list',
        name: 'componentType',
        message: 'Se han definido tres tipos de componentes UI (presentación), API (acceso a datos) y Negocio (funcionalidad completa): ',
        choices: ['UI', 'API', 'Negocio'],
        filter: function (val: any) {
          return val.toUpperCase();
        }
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Elige un nombre para tu componente, únicamente una palabra que defina su funcionalidad:',
        prefix: '[ATENCIÓN]'
      },
      {
        type: 'input',
        name: 'componentDescription',
        message: 'Describe con una o más frases la funcionalidad que cubre el componente:',
        suffix: '[ATENCIÓN: Mínimo 140 caracteres]'
      },
    ];
    inquirer.prompt<ConfigWebComponent>(questions)
      .then(answer => {
          configWebComponent = answer;
          configWebComponent.componentName = 'webcomponent-' + configWebComponent.componentType.toLowerCase() + '-' + configWebComponent.componentName;
          this.log(chalk.bold.redBright('Esta es la información de tu componente, checkea que es correcta antes de continuar:'));
          this.log(chalk.bold.cyan('Nombre: '));
          this.log(chalk.blueBright(configWebComponent.componentName));
          this.log(chalk.bold.cyan('Descripción: '));
          this.log(chalk.blueBright(configWebComponent.componentDescription));
          //TODO Añadir una llamada a GitLab aquí para que vaya a comprobar si el repositorio existe.
          this.log('');
          this.log(chalk.bold.red('[ATENCIÓN] ¡Comienza la generación del arquetipo!'));
          this.generateComponentArchetype();
        }
      );
  }

  private askAngularAppConfig(): void {
    this.log(chalk.bold.red('Esta funcionalidad se encuentra en desarrollo. Disculpa las molestias.'));
    this.log('');
    this.askProjectType();
  }

  private generateComponentArchetype() {
    new Listr([
      {
        title: 'Clonando repositorio base...',
        task: () => {
          execa.stdout('git', ['clone', 'https://github.com/hedesil/webcomponent-angular-archetype'])
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
      },
      {
        title: 'Sustituyendo nombres genéricos por el nombre del componente...',
        task: () => {
          this.log('Hasta aquí hemos llegao!')
        }
      }
    ]).run();
  }

}
