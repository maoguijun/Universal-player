// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';

import Channel from '../channel/Channel';
import ToolBar from '../ToolBar/ToolBar';
import styles from './baseLayout_.css';

const { Content, Sider } = Layout;

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggleCollapsed = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  render() {
    const {
      onComeback,
      onSourceSelected,
      onSwitchSource,
      handleSwitchChannel,
      channel,
      url,
      freeUrl,
      title,
      isFullScreen,
      children
    } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout className={styles.baceL}>
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          <Channel
            toggleCollapsed={this.toggleCollapsed}
            channel={channel}
            collapsed={collapsed}
            handleSwitchChannel={handleSwitchChannel}
          />
        </Sider>
        <Layout>
          <ToolBar
            onComeback={onComeback}
            onSwitchSource={onSwitchSource}
            freeUrl={freeUrl}
            title={title}
          />
          <Content style={{ margin: '0 16px', overflow: 'hidden' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;
