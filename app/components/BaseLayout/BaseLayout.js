// @flow
import React, { Component } from 'react';
import { Layout, Button, Icon, Row } from 'antd';

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
        <Row
          style={{
            width: collapsed ? 81 : 180,
            position: 'fixed',
            zIndex: 999,
            top: 0,
            paddintTop: 5,
            background: '#fff'
          }}
        >
          <Button
            onClick={this.toggleCollapsed}
            className={collapsed ? styles.toggleBtnColl : styles.toggleBtn}
          >
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </Row>
        <Sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
          width={180}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Channel
            toggleCollapsed={this.toggleCollapsed}
            channel={channel}
            collapsed={collapsed}
            handleSwitchChannel={handleSwitchChannel}
          />
        </Sider>
        <Layout
          className={
            collapsed ? styles.Layoutcollapsed : styles.Layoutnotcollapsed
          }
        >
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
