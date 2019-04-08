const replace = require('replace-in-file');


const settingBaseApplication = {

  componentNameApp : {
    title: 'Configurando nombre del componente',
    task: () => replace( {
      from: '${component-selector-name}',
    } )
  }
};


export const Options = {
  settingBaseApplication
};
