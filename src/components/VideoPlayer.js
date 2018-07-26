import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import Video from 'react-native-video';
import { Images } from '@theme';

const Hideable = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};

class VideoPlayer extends Component{
  state={
    showPoster: true,
    retry: 0
  }

  retry(){
    console.log(`retry[${this.state.retry}] ${this.props.url}`);
    this.setState( (prev)=>({
      retry: prev.retry + 1
    }) );
  }

  componentDidMount() {
    this.interval = setInterval( this.retry.bind(this), 2000);
  }

  componentWillUnmount() {
    if( this.interval )
      clearInterval(this.interval);
  }

  onLoad(data){
    clearInterval(this.interval);
    this.interval = undefined;
    this.setState( (prev)=>({
      showPoster: false
    }));
  }

  render(){
    return <View style={this.props.style}>
        <Video key={this.state.retry}
        source={{ uri: this.props.url }}
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode={"cover"}
        repeat={false}
        paused={ this.props.paused }
        controls={true}
        style={{flex: 1}}

        onLoad={this.onLoad.bind(this)}
      />
      <Hideable hide={!this.state.showPoster} style={{position: 'absolute', left: 0,top: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{flex: 1, resizeMode: this.props.posterResizeMode || 'contain'}}
            source={Images.loading}
          />
      </Hideable>
    </View>

  }

}

export default VideoPlayer;
