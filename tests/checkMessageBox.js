const dialogs = require('../src/dialogs.js');

async function main(){
  await dialogs.createMessageBox('Hello', 'Hi there!', 'ok');
  
  switch (await dialogs.createMessageBox('Wanna do something?', 'What do you want to do?', 'abortretryignore')){
    case 'abort':
      await dialogs.createMessageBox('Result', 'You decided to abort.', 'ok');
      break;
    case 'retry':
      await dialogs.createMessageBox('Result', 'You decided to retry.', 'ok');
      break;
    case 'ignore':
    default:
      await dialogs.createMessageBox('Result', 'You decided to abort.', 'ok');
      break;
  }

  switch (await dialogs.createMessageBox('Want a hello?', 'Do you want me to say hello?', 'yesnocancel')){
    case 'yes':
      await dialogs.createMessageBox('Result', 'Hello!', 'ok');
      break;
    case 'no':
      await dialogs.createMessageBox('Result', 'Goodbye!', 'ok');
      break;
    case 'cancel':
    default:
      await dialogs.createMessageBox('Result', 'You cancelled.', 'ok');
      break;
  }
  
  var i = 0;
  var r = false;
  while (i < 15 && !r){
    switch (await dialogs.createMessageBox('Am I a great module?', 'Am I a great module?', 'yesno')){
      case 'yes':
        await dialogs.createMessageBox('Result', 'Thank you!', 'ok');
        r = true;
        break;
      case 'no':
        await dialogs.createMessageBox('Result', 'Wrong answer! Try again.', 'ok');
        r = false;
        break;
    }
    i += 1;
  }
  if (!r){
    await dialogs.createMessageBox('Result', 'You tried 15 TIMES! You know what? You can go.', 'ok');
  }
  
  switch (await dialogs.createMessageBox('Keep going?', 'Do you want to keep going?', 'retrycancel')){
    case 'retry':
      await dialogs.createMessageBox('Result', 'You decided to retry.', 'ok');
      break;
    case 'cancel':
    default:
      await dialogs.createMessageBox('Result', 'You decided to cancel.', 'ok');
      break;
  }
}

module.exports = main;
