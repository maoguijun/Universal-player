// @flow
/**
 * 左边的菜单
 */
import React, { Component } from 'react';
import {
  Menu,
  Button,
  Icon,
  Modal,
  Form,
  Input,
  Popconfirm,
  Select
} from 'antd';
import styles from './Channel_.css';

const { Option } = Select;

const FormItem = Form.Item;

const MenuItem = Menu.Item;

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menukey: 'https://v.qq.com',
      usermenulist: [],
      httpValue: 'http://'
    };
  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    // 获取menukey
    const menukey = localStorage.getItem('menukey');
    if (menukey) {
      this.setState({ menukey });
    }
    const usermenulist = JSON.parse(
      localStorage.getItem('usermenulist') || `[]`
    );
    this.setState({
      usermenulist
    });
  }

  handleSwitchChannel = ({ key }) => {
    const { handleSwitchChannel } = this.props;
    this.setState({ menukey: key });
    localStorage.setItem('menukey', key);
    handleSwitchChannel(key);
  };

  addMenu = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({ menuModal: true });
  };

  handleCancel = () => {
    this.setState({
      menuModal: false
    });
  };

  handleOk = () => {
    const { form } = this.props;
    const { httpValue } = this.state;
    form.validateFields((err, value) => {
      if (err) {
        return;
      }
      const valueconnect = {
        ...value,
        url: httpValue + value.url
      };
      console.log(valueconnect);
      // 获取本地usermenulist
      const usermenulist = JSON.parse(
        localStorage.getItem('usermenulist') || `[]`
      );
      usermenulist.push(valueconnect);
      this.setState({ usermenulist, menuModal: false });
      localStorage.setItem('usermenulist', JSON.stringify(usermenulist));
    });
  };

  deleteMenuItem = u => {
    let { usermenulist } = this.state;
    usermenulist = usermenulist.filter(({ url }) => url !== u);
    localStorage.setItem('usermenulist', JSON.stringify(usermenulist));
    this.setState({
      usermenulist
    });
  };

  render() {
    const {
      channel,
      handleSwitchChannel,
      toggleCollapsed,
      collapsed,
      form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched }
    } = this.props;
    const { menukey, menuModal, usermenulist, httpValue } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    const nameError = isFieldTouched('name') && getFieldError('name');
    const urlError = isFieldTouched('url') && getFieldError('url');
    const item = channel.map(({ name, url }) => (
      <MenuItem key={url}>
        {collapsed && (
          <Icon className={styles.MenuItemIcon}>{name.slice(0, 2)}</Icon>
        )}
        <span>{name}</span>
      </MenuItem>
    ));
    const usermenu = usermenulist.map(({ name, url }) => (
      <MenuItem key={url}>
        <Popconfirm
          trigger="contextMenu"
          title="你要删除这个标签吗？"
          okText="删除"
          cancelText="取消"
          onConfirm={() => this.deleteMenuItem(url)}
          style={{ width: '100%' }}
        >
          {collapsed && (
            <Icon className={styles.MenuItemIcon}>
              <span>{name.slice(0, 2)}</span>
            </Icon>
          )}
          <span style={{ width: '100%' }}>{name}</span>
        </Popconfirm>
      </MenuItem>
    ));

    const selectBefore = (
      <Select
        onChange={value => {
          this.setState({ httpValue: value });
        }}
        value={httpValue}
        style={{ width: 90 }}
      >
        <Option value="http://">Http://</Option>
        <Option value="https://">Https://</Option>
      </Select>
    );
    return (
      <div style={{ marginTop: 32 }}>
        <Menu
          mode="inline"
          className={styles.Menu}
          selectedKeys={[menukey]}
          onSelect={this.handleSwitchChannel}
        >
          {item.concat(usermenu)}
        </Menu>
        <Button onClick={this.addMenu} style={{ marginLeft: 24, marginTop: 8 }}>
          <Icon type="plus" />
          添加网站
        </Button>
        <Modal
          title="添加网站"
          visible={menuModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              validateStatus={nameError ? 'error' : ''}
              help={nameError || ''}
              label="标签名"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入标签名' }]
              })(<Input maxLength={10} placeholder="name" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              validateStatus={urlError ? 'error' : ''}
              help={urlError || ''}
              label="网址"
            >
              {getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入url' }]
              })(<Input addonBefore={selectBefore} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Channel);
