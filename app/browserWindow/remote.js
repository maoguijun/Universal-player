// @flow
// 右键菜单的设置
const electron = require('electron');

const {
  remote,
  BrowserWindow,
  remote: { Menu, MenuItem }
} = electron;
console.log(9, electron);
console.log(12, remote.getCurrentWebContents(), remote.getCurrentWindow());

const remoteConfig = [
  {
    label: '前进',
    click() {
      remote.getCurrentWebContents().goForward();
    }
  },
  {
    label: '后退',
    click() {
      remote.getCurrentWebContents().goBack();
    }
  },
  {
    label: '重新加载',
    click() {
      remote.getCurrentWebContents().reload();
    }
  },
  {
    label: '开发者工具',
    click() {
      remote.getCurrentWebContents().toggleDevTools();
    }
  }
];
const menu = new Menu();
// menu.append(new MenuItem({   label: '前进',   click() {     remote
// .getCurrentWebContents()       .goForward()   } }))

remoteConfig.forEach(item => {
  menu.append(new MenuItem(item));
});
// menu.append(new MenuItem({type: 'separator'})) menu.append(new
// MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener(
  'contextmenu',
  e => {
    e.preventDefault();
    menu.popup({
      window: remote.getCurrentWindow()
    });
  },
  false
);
