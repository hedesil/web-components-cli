web-components-cli
==================

Web Component generator (based on Angular 7 elements)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/web-components-cli.svg)](https://npmjs.org/package/web-components-cli)
[![Downloads/week](https://img.shields.io/npm/dw/web-components-cli.svg)](https://npmjs.org/package/web-components-cli)
[![License](https://img.shields.io/npm/l/web-components-cli.svg)](https://github.com/hedesil/web-components-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g web-components-cli
$ webcomp COMMAND
running command...
$ webcomp (-v|--version|version)
web-components-cli/0.0.0 win32-x64 node-v10.14.1
$ webcomp --help [COMMAND]
USAGE
  $ webcomp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`webcomp help [COMMAND]`](#webcomp-help-command)
* [`webcomp new-project [APPLICATIONTYPE]`](#webcomp-new-project-applicationtype)

## `webcomp help [COMMAND]`

display help for webcomp

```
USAGE
  $ webcomp help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_

## `webcomp new-project [APPLICATIONTYPE]`

Add new project based on Angular 7 and Web Components standard

```
USAGE
  $ webcomp new-project [APPLICATIONTYPE]

ARGUMENTS
  APPLICATIONTYPE  Type of generated archetype

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\new-project.ts](https://github.com/hedesil/web-components-cli/blob/v0.0.0/src\commands\new-project.ts)_
<!-- commandsstop -->
