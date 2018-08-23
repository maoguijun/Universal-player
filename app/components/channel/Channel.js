// @flow
/**
 * 左边的菜单
 */
import React, { Component } from 'react';
import { Menu, Button, Icon } from 'antd';
import styles from './Channel_.css';

const MenuItem = Menu.Item;

// const Channel = ({ channel, handleSwitchChannel }) => {
//   const item = channel.map(d => <MenuItem key={d.url}>{d.name}</MenuItem>);
//   return <Menu onSelect={handleSwitchChannel}>{item}</Menu>;
// };
class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      channel,
      handleSwitchChannel,
      toggleCollapsed,
      collapsed
    } = this.props;
    const item = channel.map(({ name, url }) => (
      <MenuItem key={url}>
        {collapsed && (
          <Icon className={styles.MenuItemIcon}>{name.slice(0, 2)}</Icon>
        )}
        <span>{name}</span>
      </MenuItem>
    ));
    return (
      <div style={{ marginTop: 15 }}>
        <Button
          onClick={toggleCollapsed}
          className={collapsed ? styles.toggleBtnColl : styles.toggleBtn}
        >
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          mode="inline"
          className={styles.Menu}
          defaultSelectedKeys={[channel && channel[0] && channel[0].url]}
          onSelect={handleSwitchChannel}
        >
          {item}
        </Menu>
      </div>
    );
  }
}

export default Channel;
