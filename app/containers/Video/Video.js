// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { webview, ipcRenderer } from 'electron';
import BaseLayout from '../../components/BaseLayout';
import * as sourceActions from '../../actions/sourse';
import channelList from '../../constants/channel.json';
import viplist from '../../constants/viplist.json';

class VideoPlay extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      channel: [],
      url: 'https://v.qq.com',
      freeUrl: [],
      isFullScreen: false
    };
  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    const url = localStorage.getItem('menukey');
    if (url) {
      this.setState({ url });
    }
  }

  componentDidMount() {
    const { getAllVideoSource } = this.props;
    const { myWebview } = this;
    getAllVideoSource();
    myWebview.addEventListener('dom-ready', () => {
      this.setTitle();
    });
    myWebview.addEventListener('new-window', obj => {
      // const { freeUrl } = this.state;
      this.setState({ url: `${obj.url}` });
    });
    myWebview.addEventListener('will-navigate', obj => {
      this.setState({ url: `${obj.url}` });
    });
    ipcRenderer.on('enter-full-screen', (e, msg) => {
      this.setState({ isFullScreen: msg });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { source } = nextProps;
    // 接口有数据就用接口数据，没有就用本地数据
    if (source) {
      this.setState({ channel: source.platformlist, freeUrl: source.list });
    } else {
      this.setState({ channel: channelList, freeUrl: viplist });
    }
  }

  handleSwitchChannel = url => {
    this.setState({ url });
  };

  setTitle = () => {
    const title = this.myWebview.getTitle();
    this.setState({ title });
  };

  onComeback = () => {
    this.myWebview.goBack();
  };

  onSwitchSource = url => {
    const currentVideoUrl = this.myWebview.getURL();
    console.log(74, currentVideoUrl);
    this.setState({ url: `${url}${currentVideoUrl}` });
    console.log(75, `${url}${currentVideoUrl}`);
  };

  render() {
    const { channel, url, freeUrl, title, isFullScreen } = this.state;
    return (
      <BaseLayout
        onComeback={this.onComeback}
        onSourceSelected={this.onSourceSelected}
        onSwitchSource={this.onSwitchSource}
        handleSwitchChannel={this.handleSwitchChannel}
        {...{ channel, url, freeUrl, title, isFullScreen }}
      >
        <webview
          plugins="true"
          ref={w => {
            this.myWebview = w;
          }}
          title="腾讯视频"
          style={{
            height: isFullScreen ? '100vh' : 'calc(100vh - 60px)',
            width: '100%'
          }}
          src={url}
          allowpopups="true"
        />
      </BaseLayout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(sourceActions, dispatch)
  };
}
function mapStateToProps(state) {
  return { source: state.source };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlay);
