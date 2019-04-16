const fs = require('fs-extra');
//
// fs.copy('./lib', 'web-components-angular-cli');
// fs.copy('./package.json', 'web-components-angular-cli');

copyFiles();

async function copyFiles () {
  try {
    await fs.copy('package.json', 'web-components-angular-cli');
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}
