// @flow
import React from 'react';
import { Icon, Select, Button, Dropdown, Menu } from 'antd';
import MenuList from '../Menu/Menu';

const { Option } = Select;

const ToolBar = ({
  onComeback,
  onSwitchSource,
  onSourceSelected,
  freeUrl,
  title
}) => {
  const menu = (
    <div style={{ height: '50%', overflow: 'hidden' }}>
      <Menu
        onClick={e => {
          onSwitchSource(e.item.props && e.item.props.value);
        }}
      >
        {freeUrl.map(({ name, url }) => (
          <Menu.Item key={name} value={url}>
            {name}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
  return (
    <div
      style={{
        display: 'flex',
        height: 68,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 20px'
      }}
    >
      <div>
        <Button
          type="rollback"
          style={{ fontSize: '18px', cursor: 'pointer' }}
          onClick={onComeback}
        >
          返回
        </Button>
      </div>
      <span style={{ padding: '0 20px', color: 'darkcyan' }}>{title}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            选择vip线路 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
      <MenuList />
    </div>
  );
};

export default ToolBar;
