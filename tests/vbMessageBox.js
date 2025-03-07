const dialogs = require('../src/dialogs');

async function main() {
  await dialogs.createVisualBasicMessageBox('Hello', 'Hi there!', 'ok').then(console.log);
  await dialogs.createVisualBasicMessageBox('Keep going?', 'Do you wanna keep going?', 'okcancel').then(console.log);
  await dialogs.createVisualBasicMessageBox('Keep going?', 'Do you wanna keep going?', 'okcancel').then(console.log);
  await dialogs.createVisualBasicMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore').then(console.log);
  await dialogs.createVisualBasicMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore').then(console.log);
  await dialogs.createVisualBasicMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore').then(console.log);
  await dialogs.createVisualBasicMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel').then(console.log);
  await dialogs.createVisualBasicMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel').then(console.log);
  await dialogs.createVisualBasicMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel').then(console.log);
  await dialogs.createVisualBasicMessageBox('Am I a great module?', 'Am I a great module?', 'yesno').then(console.log);
  await dialogs.createVisualBasicMessageBox('Am I a great module?', 'Am I a great module?', 'yesno').then(console.log);
  await dialogs.createVisualBasicMessageBox('Keep going?', 'Do you want to keep going?', 'retrycancel').then(console.log);
  await dialogs.createVisualBasicMessageBox('Keep going?', 'Do you want to keep going?', 'retrycancel').then(console.log);
}

module.exports = main;
