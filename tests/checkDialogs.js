const dialogs = require('../src/dialogs.js');

async function main(){
  await dialogs.createMessageBox('Hello', 'Hi there!', 'ok').then(console.log);
  await dialogs.createMessageBox('Keep going?', 'Do you wanna keep going?', 'okcancel').then(console.log);
  await dialogs.createMessageBox('Keep going?', 'Do you wanna keep going?', 'okcancel').then(console.log);
  await dialogs.createMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore').then(console.log);
  await dialogs.createMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore').then(console.log);
  await dialogs.createMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore').then(console.log);
  await dialogs.createMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel').then(console.log);
  await dialogs.createMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel').then(console.log);
  await dialogs.createMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel').then(console.log);
  await dialogs.createMessageBox('Am I a great module?', 'Am I a great module?', 'yesno').then(console.log);
  await dialogs.createMessageBox('Am I a great module?', 'Am I a great module?', 'yesno').then(console.log);
  await dialogs.createMessageBox('Keep going?', 'Do you want to keep going?', 'retrycancel').then(console.log);
  await dialogs.createMessageBox('Keep going?', 'Do you want to keep going?', 'retrycancel').then(console.log);
}

module.exports = main;
