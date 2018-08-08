import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from '@react-native-media-controls';
import { Images } from '@theme';



class VideoPlayer extends Component{
  state={
    showPoster: true,
    retry: 0,

    currentTime: 0,
    duration: 0,
    isFullScreen: false,
    isLoading: true,
    paused: this.props.paused,
    playerState: PLAYER_STATES.PAUSED,
    isBuffering: true
  }

  player = null;

  onSeek = seek => {
    console.log(`seek: ${seek}`);
    this.player.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.player.seek(0);
  };

  onProgress = data => {

    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState((prev)=>({
        currentTime: data.currentTime,
        duration: data.seekableDuration ? data.seekableDuration : prev.duration
      }));
    }
  };

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  exitFullScreen = () => this.player.dismissFullscreenPlayer()

  onFullscreenPlayerWillDismiss = ()=> {
    this.setState({paused: true, playerState: PLAYER_STATES.PAUSED})
  }

  enterFullScreen = () => {};

  onFullScreen = () => this.player.presentFullscreenPlayer()

  onSeeking(currentTime){
    this.setState({ currentTime });
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
    this.player.dismissFullscreenPlayer();

    if( this.interval )
      clearInterval(this.interval);
  }

  onLoad(data){
    clearInterval(this.interval);
    this.interval = undefined;
    console.log(`onLoad`,data);
    this.setState( (prev)=>({
      showPoster: false,
      duration: data.duration,
      isLoading: false
    }));
  }

  onBuffer = (data)=>{

  }

  render(){
    return (
      <View style={this.props.style}>
        <Video key={this.state.retry} ref={(ref) => this.player = ref }
        style={{position: 'absolute', top: 0, right: 0, left: 0, botttom: 0}}
        source={{ uri: this.props.url }}
        rate={1.0}
        muted={false}
        resizeMode={"contain"}
        repeat={false}
        paused={ this.state.paused }
        controls={false}
        onReadyForDisplay={ (data)=> console.log('onReadyForDisplay',data)}
        onPlaybackStalled={ (data)=> console.log('onPlaybackStalled',data)}
        onPlaybackResume={ (data)=> console.log('onPlaybackResume',data)}
        onTimedMetadata={ (data)=> console.log('onTimedMetadata', data)}
        onPlaybackRateChange={ (data)=> this.setState({isBuffering: data.playbackRate === 0 &&  !this.state.paused }) }
        onFullscreenPlayerWillDismiss = {this.onFullscreenPlayerWillDismiss}
        onBuffer={this.onBuffer}
        onLoad={this.onLoad.bind(this)}
        onLoadStart={this.onLoadStart}
        onEnd={this.onEnd}
        onProgress={this.onProgress}
        style={{flex: 1}}
      />
      <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          isBuffering={this.state.isBuffering}
          isLive={true}
          mainColor={'#FF0000'}
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
        />
    </View>)
  }

}

export default VideoPlayer;
