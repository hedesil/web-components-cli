import {Command, flags} from '@oclif/command';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as execa from 'execa';
import * as Listr from 'listr';
import {ConfigProject} from "../models/interfaces";
import {ConfigWebComponent} from "../models/interfaces";

const UpdateRenderer = require('listr-update-renderer');
const fs = require('fs');

export let configProject: ConfigProject = {
  projectType: ''
};

export let configWebComponent: ConfigWebComponent = {
  componentType: 'string',
  componentName: '',
  componentDescription: '',
  compName: '',
  shortenedNameComp: '',
  shortenedName: ''
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
    this.log(chalk.bold.yellow('         #######  ########  ######## ##    ##    '));
    this.log(chalk.bold.yellow('        ##     ## ##     ## ##       ###   ##    '));
    this.log(chalk.bold.yellow('        ##     ## ##     ## ##       ####  ##    '));
    this.log(chalk.bold.yellow('        ##     ## ########  ######   ## ## ##    '));
    this.log(chalk.bold.yellow('        ##     ## ##        ##       ##  ####    '));
    this.log(chalk.bold.yellow('        ##     ## ##        ##       ##   ###    '));
    this.log(chalk.bold.yellow('         #######  ##        ######## ##    ##     '));
    // this.log(chalk.bold.yellow(''));
    this.log(chalk.bold.yellow(' ######   #######  ##     ## ########   #######  ##    ## ######## ##    ## ########  ######'));
    this.log(chalk.bold.yellow('##    ## ##     ## ###   ### ##     ## ##     ## ###   ## ##       ###   ##    ##    ##    ##'));
    this.log(chalk.bold.yellow('##       ##     ## #### #### ##     ## ##     ## ####  ## ##       ####  ##    ##    ##'));
    this.log(chalk.bold.yellow('##       ##     ## ## ### ## ########  ##     ## ## ## ## ######   ## ## ##    ##     ######'));
    this.log(chalk.bold.yellow('##       ##     ## ##     ## ##        ##     ## ##  #### ##       ##  ####    ##          ##'));
    this.log(chalk.bold.yellow('##    ## ##     ## ##     ## ##        ##     ## ##   ### ##       ##   ###    ##    ##    ##'));
    this.log(chalk.bold.yellow(' ######   #######  ##     ## ##         #######  ##    ## ######## ##    ##    ##     ######'));
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

  private async askComponentType() {
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
    await inquirer.prompt<ConfigWebComponent>(questions)
      .then(answer => {
          configWebComponent = answer;
          configWebComponent.compName = 'webcomponent-' + configWebComponent.componentType.toLowerCase() + '-' + configWebComponent.componentName;
          this.log(chalk.bold.redBright('Esta es la información de tu componente, checkea que es correcta antes de continuar:'));
          this.log(chalk.bold.cyan('Nombre: '));
          this.log(chalk.blueBright(configWebComponent.compName));
          this.log(chalk.bold.cyan('Descripción: '));
          this.log(chalk.blueBright(configWebComponent.componentDescription));
          //TODO: Añadir una llamada a GitLab aquí para que vaya a comprobar si el repositorio existe.
          this.log('');
          this.log(chalk.bold.red('[ATENCIÓN] ¡Comienza la generación del arquetipo!'));
          this.generateComponentArchetype(configWebComponent);
          // this.probandoTutorial();
        }
      );
  }

  private askAngularAppConfig(): void {
    this.log(chalk.bold.red('Esta funcionalidad se encuentra en desarrollo. Disculpa las molestias.'));
    this.log('');
    this.askProjectType();
  }

  private probandoTutorial() {
    let tasks = new Listr([
      {
        title: 'Git',
        task: () => {
          return new Listr([
            {
              title: 'Checking git status',
              task: () => execa.stdout('git', ['status', '--porcelain']).then(result => {
                if (result !== '') {
                  throw new Error('Unclean working tree. Commit or stash changes first.');
                }
              })
            },
            {
              title: 'Checking remote history',
              task: () => execa.stdout('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then(result => {
                if (result !== '0') {
                  throw new Error('Remote history differ. Please pull changes.');
                }
              })
            }
          ], {concurrent: true});
        }
      },
      {
        title: 'Install package dependencies with npm',
        enabled: ctx => ctx.yarn === false,
        task: () => execa('npm', ['install'])
      },
      {
        title: 'Run tests',
        task: () => execa('npm', ['test'])
      },
    ]).run()
  }

  private generateComponentArchetype(configWebComponent: ConfigWebComponent) {
    new Listr(
      [
        {
          title: 'Clonando repositorio del arquetipo...',
          task: () => {
            execa.stdout('git', ['clone', 'https://github.com/hedesil/webcomponent-angular-archetype', '--progress', '--verbose'])
              .then(res => {
                  console.log(res);
                  this.renameFiles(configWebComponent);
                  this.renameInsideFiles(configWebComponent);
                  this.renameFolders(configWebComponent);
                }
              )
              .catch(err => {
                this.log('Ha ocurrido un error :( ' + err);
              })
          }
        },
      ],
      {
        concurrent: false,
        renderer: UpdateRenderer,
      }
    ).run();
  }

  private async renameFiles(configWebComponent: ConfigWebComponent) {
    fs.rename('./webcomponent-angular-archetype/src/app/shortenedname/shortenedname.component.css', './webcomponent-angular-archetype/src/app/shortenedName/' + configWebComponent.componentName + '.component.css', function (err: any) {
      if (err) console.log('Error: ' + err);
      console.log(chalk.bold.greenBright('File Renamed to: ' + configWebComponent.componentName + '.component.css'));
    });

    fs.rename('./webcomponent-angular-archetype/src/app/shortenedname/shortenedname.component.spec.ts', './webcomponent-angular-archetype/src/app/shortenedName/' + configWebComponent.componentName + '.component.spec.ts', function (err: any) {
      if (err) console.log('Error: ' + err);
      console.log(chalk.bold.greenBright('File Renamed to: ' + configWebComponent.componentName + '.component.spec.ts'))

    });

    fs.rename('./webcomponent-angular-archetype/src/app/shortenedname/shortenedname.component.ts', './webcomponent-angular-archetype/src/app/shortenedName/' + configWebComponent.componentName + '.component.ts', function (err: any) {
      if (err) console.log('Error: ' + err);
      console.log(chalk.bold.greenBright('File Renamed to: ' + configWebComponent.componentName + '.component.ts'))
    });

    fs.rename('./webcomponent-angular-archetype/src/app/shortenedname/shortenedname.component.html', './webcomponent-angular-archetype/src/app/shortenedName/' + configWebComponent.componentName + '.component.html', function (err: any) {
      if (err) console.log('Error: ' + err);
      console.log(chalk.bold.greenBright('File Renamed to: ' + configWebComponent.componentName + '.component.html'))
    });
  }

  private async renameFolders(configWebComponent: ConfigWebComponent) {

    fs.renameSync('./webcomponent-angular-archetype/src/app/shortenedname', './webcomponent-angular-archetype/src/app/' + configWebComponent.componentName);

    fs.rename('./webcomponent-angular-archetype', ('./' + configWebComponent.compName), function (err: any) {
      if (err) {
        console.log('Error: ' + err)

      }
      console.log('File Renamed to: ' + configWebComponent.compName)
    });
  }

  private async renameInsideFiles(configWebComponent: ConfigWebComponent) {
    const replace = require("replace");
    replace({
      regex: '<compName>',
      replacement: configWebComponent.compName,
      paths: ['.'],
      recursive: true,
      silent: true
    });
    replace({
      regex: '<shortenedName>',
      replacement: configWebComponent.componentName,
      paths: ['.'],
      recursive: true,
      silent: true
    });
    replace({
      regex: '<shortenedNameComp>',
      replacement: configWebComponent.componentName.charAt(0).toUpperCase() + configWebComponent.componentName.slice(1) + 'Component',
      paths: ['.'],
      recursive: true,
      silent: true
    });
    replace({
      regex: '<componentDescription>',
      replacement: configWebComponent.componentDescription,
      paths: ['.'],
      recursive: true,
      silent: true
    });
  }
}
