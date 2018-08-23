/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {app, BrowserWindow} from 'electron';
import path from 'path';
import MenuBuilder from './menu';
import BrowserWindowConfig from './browserWindow/browserWindow.config';

console.log(14, BrowserWindow);
let mainWindow = null;

/**
 * 添加 flash 插件
 */
let pluginName;
console.log(process.platform)
switch (process.platform) {
  case 'win32':
    pluginName = 'win32/pepflashplayer64_30_0_0_154.dll';
    break;
  case 'win64':
    pluginName = 'win64/pepflashplayer.dll';
    break;
  case 'darwin':
    pluginName = 'mac/PepperFlashPlayer.plugin';
    break;
  case 'linux':
    pluginName = 'linux/libpepflashplayer.so';
    break;
  default:
    break;
}
// console.log(41, path.join(`${__dirname}/electron_plugins/`, pluginName));
// console.log(42, app.getPath('pepperFlashSystemPlugin')) 优先使用自带的
app
  .commandLine
  .appendSwitch('ppapi-flash-path', path.join(`${__dirname}/electron_plugins/`, pluginName));
// 自带的没有就使用用户电脑上的
app
  .commandLine
  .appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'));

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module')
    .globalPaths
    .push(p);
}

const installExtensions = async() => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even after all
  // windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async() => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow(BrowserWindowConfig);

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#u
  // s ing-ready-to-show-event
  mainWindow
    .webContents
    .on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      mainWindow.show();
      mainWindow.focus();
    });

  mainWindow.on('closed', () => {
    console.log('close');
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
