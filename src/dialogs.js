const child_process = require("child_process");
const path = require("path");
const fs = require("fs");

// Utilities
/**
 * Executes a command.
 * @param {string} command - The command to execute.
 * @param {object} options - The options for the command.
 * @returns {Promise<{error, stderr, stdout}>} - The result of the command.
 */
function exec(command, options = null){
  return new Promise((resolve) => {
    child_process.exec(command, options, (error, stdout, stderr) => resolve({error, stderr, stdout}));
  });
}

/**
 * Converts a string to a VBScript string.
 * @param {string} string - The string to convert.
 * @returns {string} - The VBScript string.
 */
function stringifyVB(string){
  return string.includes('"') ? `${string.replace('"', '""')}` : `"${string}"`;
}

/**
 * Gets the python interpreter.
 * @returns {string} - The python interpreter.
 */
async function getDialogs(){
  var py;
  if (process.env.PYTHON){
    py = process.env.PYTHON;
  } else {
    try{
      await child_process.execSync('python --version');
      py = 'python';
    } catch (e){
      try {
        await child_process.execSync('python3 --version');
        py = 'python3';
      } catch (e){
        try{
          await child_process.execSync('py --version');
          py = 'py';
        } catch (e) {
          py = null;
        }
      }
    }
  }
  if (py) return (py + ' ' + path.join(__dirname, 'dialogs.py'));
  if (process.platform == 'win32') return path.join(__dirname, 'msgbox.exe');
  return null;
}

// Functions
/**
 * Message box
 * @param {string} title - The title of the message box.
 * @param {string} body - The body of the message box.
 * @param {0|1|2|3|4|5|16|17|18|19|20|21|32|33|34|35|36|37|48|49|50|51|52|53|64|65|66|67|68|69} key - The key of the message box.
 */
async function msgbox(title, body, key){
  await fs.writeFileSync('msgbox.vbs', `WScript.StdOut.WriteLine msgbox(${stringifyVB(body)} ,${String(key)}, ${stringifyVB(title)})`, {encoding: 'utf-8'});
  return (await exec('cscript msgbox.vbs', { encoding: 'utf-8' })).stdout.split('\n')[3];
}

/**
 * Message box
 * @param {string} title - The title of the message box.
 * @param {string} body - The body of the message box.
 * @param {"abortretryignore"|"ok"|"okcancel"|"retrycancel"|"yesno"|yesnocancel"} type - The type of the message box.
 * @param {"error"|"question"|"ask"|"warning"|"warn"|"information"|"info"} icon - The icon of the message box.
 * @returns {Promise<boolean|string>} - The result of the message box.
 */
async function messageBox(title, body, type, icon){
  if (!(await getDialogs())) throw Error('No python interpreter found');
  return (await exec(`${await getDialogs()} --title=${stringifyVB(title)} --body=${stringifyVB(body)} --type=${stringifyVB(type)} --icon=${stringifyVB(icon)}`, { encoding: "utf-8" })).stdout.split('\n')[0];
}

/**
 * Creates a message box
 * @param {string} title - The title of the message box.
 * @param {string} body - The body of the message box.
 * @param {"ok"|"okcancel"|"abortretryignore"|"yesnocancel"|"yesno"|"retrycancel"} type - The type of the message box.
 * @param {"error"|"question"|"ask"|"warning"|"warn"|"information"|"info"} icon - The icon of the message box.
 */
async function createMessageBox(title, body, type = 'yesno', icon = 'info'){
  return await messageBox(title, body, type, icon);
}

/**
 * Creates a message box with Visual Basic
 * @param {string} title - The title of the message box.
 * @param {string} body - The body of the message box.
 * @param {"ok"|"okcancel"|"abortretryignore"|"yesnocancel"|"yesno"|"retrycancel"} type - The type of the message box.
 * @param {"error"|"question"|"ask"|"warning"|"warn"|"information"|"info"} icon - The icon of the message box.
 */
async function createVisualBasicMessageBox(title, body, type = 'yesno', icon = 'info', translateReslut = true){
  var key = 0;

  switch (icon){
    case null:
    case 'none':
    default:
      key = 0;
      break;
    case 'error':
      key = 16;
      break;
    case 'question':
    case 'ask':
      key = 32;
      break;
    case 'warning':
    case 'warn':
      key = 48;
      break;
    case 'information':
    case 'info':
      key = 64;
      break;
  }

  switch (type){
    case null:
    case 'none':
    case 'ok':
    default:
      key += 0;
      break;
    case 'okcancel':
      key += 1;
      break;
    case 'abortretryignore':
      key += 2;
      break;
    case 'yesnocancel':
      key += 3;
      break;
    case 'yesno':
      key += 4;
      break;
    case 'retrycancel':
      key += 5;
      break;
  }

  var r = await msgbox(title, body, key);
  if (!translateReslut){
    return r;
  }

  switch (r){
    case 1:
      return 'ok';
    case 2:
      return 'cancel';
    case 3:
      return 'abort';
    case 4:
      return 'retry';
    case 5:
      return 'ignore';
    case 6:
      return 'yes';
    case 7:
      return 'no';
    default:
      return r;
  }
}

if (process.platform == 'win32') {
  module.exports = {
    getDialogs,
    messageBox,
    createMessageBox,
    createVisualBasicMessageBox,
  }
} else {
  module.exports = {
    getDialogs,
    messageBox,
    createMessageBox,
  }
}
