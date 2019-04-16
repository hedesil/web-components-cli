import {Command, flags} from '@oclif/command';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as execa from 'execa';
import * as Listr from 'listr';
import {ConfigProject} from "../models/interfaces";
import {ConfigWebComponent} from "../models/interfaces";

const UpdateRenderer = require('listr-update-renderer');
const fs = require('fs-extra');

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
    this.log(chalk.bold.yellow(''));
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
        message: 'Do you want to create a Web Component or an SPA?',
        choices: ['SPA', 'Web Component'],
        filter: function (val: any) {
          let clean = val.replace(/ /g, '');
          return clean.toUpperCase();
        }
      }
    ];
    inquirer.prompt<ConfigProject>(questions)
      .then(answer => {
          configProject = answer;
          switch (configProject.projectType) {
            case 'SPA':
              this.log('It is going to create an archetype of Angular 7 Single Page Application');
              this.askAngularAppConfig();
              break;
            case 'WEBCOMPONENT':
              this.log('It is going to create an archetype of Web Component based on Angular 7');
              this.askComponentType();
          }
        }
      )
      .catch(error => {
        this.log('An error has occurred.');
      })
  }

  private async askComponentType() {
    const questions = [
      {
        type: 'list',
        name: 'componentType',
        message: 'You must choose one option: UI (presentation component), API (data access component) or BS (business logic component)',
        choices: ['UI', 'API', 'BS'],
        filter: function (val: any) {
          return val.toUpperCase();
        }
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Choose a name for your component, just a word that defines its functionality:',
      },
      {
        type: 'input',
        name: 'componentDescription',
        message: 'Describe the functionality that the component covers with one or more sentences:',
      },
    ];
    await inquirer.prompt<ConfigWebComponent>(questions)
      .then(answer => {
          configWebComponent = answer;
          configWebComponent.compName = 'webcomponent-' + configWebComponent.componentType.toLowerCase() + '-' + configWebComponent.componentName;
          this.log(chalk.bold.redBright('This is the information of your component:'));
          this.log(chalk.bold.cyan('Name: '));
          this.log(chalk.green(configWebComponent.compName));
          this.log(chalk.bold.cyan('Description: '));
          this.log(chalk.green(configWebComponent.componentDescription));
          //TODO: Añadir una llamada a GitLab aquí para que vaya a comprobar si el repositorio existe.
          this.log('');
          this.log(chalk.bold.red('[ATTENTION] The generation of the archetype begins!'));
          this.generateComponentArchetype(configWebComponent);
          // this.probandoTutorial();
        }
      );
  }

  private askAngularAppConfig(): void {
    this.log(chalk.bold.red('This functionality is in development. Sorry for the inconvenience.'));
    this.log('');
    this.askProjectType();
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
      console.log('Directory Renamed to: ' + configWebComponent.compName)
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
