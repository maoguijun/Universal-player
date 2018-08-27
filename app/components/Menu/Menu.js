// @flow
import React, { Component } from 'react';
import { Icon, Button, Row, Popover } from 'antd';
import { app, Menu, shell, BrowserWindow, remote } from 'electron';
// import * as _ from 'lodash';
import styles from './Menu_.css';
import makeDraggable from '../../utils/dragjs/dragjs';

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
/**
 * 这实际上是右上角的三个功能按键
 */
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

  componentDidMount() {
    makeDraggable(document.getElementById('toolbar'));
  }

  render() {
    const { menu } = this.state;
    return (
      <Row id="menuList" {...this.props} className={styles.menu}>
        <Button.Group>
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
        </Button.Group>
      </Row>
    );
  }
}

export default MenuList;
