// @flow
import React, { Component } from 'react';
import { Icon, Button, Row, Popover } from 'antd';
import { app, Menu, shell, BrowserWindow, remote } from 'electron';
// import * as _ from 'lodash';
import styles from './Menu_.css';

console.log(6, app, Menu, shell, BrowserWindow, remote);
const { getCurrentWindow } = remote;

// 判断当前是不是全屏
const isFullScreen = () => {
  const h = global.screen.availHeight === global.outerHeight;
  const w = global.screen.availWidth === global.outerWidth;
  return h && w;
};
const getMenuList = () => {
  const menu = [
    {
      type: 'minus',
      content: '最小化',
      show: true,
      onClick: () => {
        getCurrentWindow().minimize();
      }
    },
    {
      type: 'shrink',
      content: '缩小',
      show: isFullScreen(),
      onClick: () => {
        getCurrentWindow().unmaximize();
      }
    },
    {
      type: 'arrows-alt',
      content: '全屏',
      show: !isFullScreen(),
      onClick: () => {
        getCurrentWindow().maximize();
      }
    },
    {
      type: 'close',
      content: '关闭',
      show: true,
      onClick: () => {
        getCurrentWindow().close();
      }
    }
  ].filter(({ show }) => show);
  return menu;
};

class MenuList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      menu: getMenuList()
    };
  }

  componentWillMount() {
    console.log(37, this.props);
    window.dragObj = {};
    window.addEventListener('resize', () => {
      this.setState({ menu: getMenuList() });
    });
  }

  // 点着上面拖动窗口
  // dragWindow = e => {
  //   window.dragObj = {
  //     ...window.dragObj,
  //     mouseX: e.clientX,
  //     mouseY: e.clientY
  //   };
  //   if (!window.dragObj.drag) {
  //     return;
  //   }
  //   window.moveTo(
  //     e.screenX - window.dragObj.clickX,
  //     e.screenY - window.dragObj.clickY
  //   );
  // };
  // startDragToggle = drag => {
  //   window.dragObj = {
  //     ...window.dragObj,
  //     drag,
  //     clickX: window.dragObj.mouseX,
  //     clickY: window.dragObj.mouseY
  //   };
  // };
  render() {
    const { menu } = this.state;
    return (
      <Row
        id="menu_"
        {...this.props}
        className={styles.menu}
        // onMouseDown={() => this.startDragToggle(true)}
        // onMouseUp={() => this.startDragToggle(false)}
        // onMouseMove={this.dragWindow}
        // onMouseEnter={() => this.startDragToggle(false)}
        // onMouseLeave={() => this.startDragToggle(false)}
      >
        {menu.map(({ type, content, onClick }) => (
          <Popover
            key={type}
            placement="topLeft"
            title=""
            content={content}
            trigger="hover"
          >
            <Button onClick={onClick} className={styles.button}>
              <Icon type={type} />
            </Button>
          </Popover>
        ))}
      </Row>
    );
  }
}

export default MenuList;
