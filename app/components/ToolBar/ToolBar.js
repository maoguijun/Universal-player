// @flow
import React, { Component } from 'react';
import { Icon, Select, Button, Dropdown, Menu } from 'antd';
import * as _ from 'lodash';

const { Option } = Select;

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  uniqList = array => {
    const arr = [];
    array.forEach(item => {
      if (arr.every(({ url }) => url !== item.url)) {
        arr.push(item);
      }
    });
    return arr;
  };

  getOptions = urllist => {
    const list = this.uniqList(urllist);
    const options = list.map(({ name, url }) => (
      <Option key={name} value={url}>
        {name}
      </Option>
    ));
    return options;
  };

  render() {
    const { onComeback, onSwitchSource, freeUrl, title } = this.props;
    return (
      <div
        id="toolbar"
        style={{
          display: 'flex',
          height: 48,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 20px'
        }}
      >
        <div>
          <Button type="rollback" onClick={onComeback}>
            返回
          </Button>
        </div>
        <span style={{ padding: '0 20px', color: 'darkcyan' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select onSelect={onSwitchSource} style={{ width: 200 }}>
            {this.getOptions(freeUrl)}
          </Select>
        </div>
        <div style={{ width: 140 }} />
      </div>
    );
  }
}

export default ToolBar;
