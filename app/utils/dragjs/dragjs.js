// @flow
import drag from 'electron-drag';
import { remote } from 'electron';

const { getCurrentWindow } = remote;

const makeDraggable = el => {
  try {
    // const drag = require('electron-drag');
    if (drag.supported) {
      drag(el);
    } else {
      makeDraggableFallback(el);
    }
  } catch (ex) {
    makeDraggableFallback(el);
  }
};

const makeDraggableFallback = el => {
  // 方案一
  // el.style['-webkit-app-region'] = 'drag';

  // 方案二
  let dragging = false;
  let mouseX = 0;
  let mouseY = 0;
  el.addEventListener('mousedown', e => {
    dragging = true;
    const { pageX, pageY } = e;
    mouseX = pageX;
    mouseY = pageY;
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
  });
  window.addEventListener('mousemove', e => {
    if (dragging) {
      const { pageX, pageY } = e;
      const win = getCurrentWindow();
      const pos = win.getPosition();
      pos[0] = pos[0] + pageX - mouseX;
      pos[1] = pos[1] + pageY - mouseY;
      // win.setPosition(pos[0], pos[1], true);
      window.moveTo(pos[0], pos[1]);
    }
  });
};

export default makeDraggable;
