import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import BroadcastView from './BroadcastView';
import Permissions from 'react-native-permissions';
import {StreamingEngine} from '../config';
console.log('StreamingEngine', StreamingEngine);
const RecordImage = require('../../assets/Rec.png');
const FlipImage = require('../../assets/Flip.png');
const TorchImage = require('../../assets/Torch.png');
const StopImage = require('../../assets/Stop.png');
const {width, height} = Dimensions.get('window');

export default class GoLive extends Component {
  constructor(props){
    super(props);
    this.state = {
      broadcasting:false,
      muted:false,
      flashEnabled:false,
      frontCamera:false,
      recordingTime: '00:00:00',
      recordButtonImage: RecordImage,
      permissionGranted:false
    }
  }
  componentDidMount(){
    Permissions.checkMultiple(['camera', 'microphone']).then((response) =>{

      const permissionGranted = (response.camera === "authorized" && response.microphone === "authorized");
      if(!permissionGranted){
        this._requestPermissions()
      }

      this.setState({
        permissionGranted:permissionGranted
      });
      setTimeout( ()=> this.setState({
        frontCamera: true
      }) , 500);
    })
  }
  _requestPermissions() {
    let cameraPermission = false;
    let microphonePermission = false;
    Permissions.request('camera').then(response => {
      if(response === 'authorized'){
        cameraPermission = true
      }
      Permissions.request('microphone').then(resp => {
        if (resp === 'authorized'){
          microphonePermission = true
        }
        if(!(cameraPermission && microphonePermission)){
          Alert.alert(
              'Broadcast',
              'In order to broadcast We need access to your camera, microphone',
              [
                {text: 'No way', onPress: null },
                {text: 'Open Settings', onPress: Permissions.openSettings}
              ]
          )
        }
        this.setState({
          permissionGranted:(cameraPermission && microphonePermission)
        })
      })
    })
  }
  render() {
    if(!this.state.permissionGranted){
      return(
          <View style={{backgroundColor:'black'}}>
            <Text>Request Permissions are not granted!</Text>
          </View>
        )
    }
    return (
      <View style={styles.container}>
        <BroadcastView style={styles.contentArea}
                       hostAddress={StreamingEngine.hostAddress}
                       applicationName={StreamingEngine.applicationName}
                       sdkLicenseKey={StreamingEngine.sdkLicenseKey}
                       broadcastName={StreamingEngine.streamName}
                       username={StreamingEngine.username}
                       password={StreamingEngine.password}
                       backgroundMode={false}
                       sizePreset={2}
                       broadcasting={this.state.broadcasting}
                       muted={this.state.muted}
                       flashOn={this.state.flashEnabled}
                       frontCamera={this.state.frontCamera}
                       onBroadcastStart={this._didStartBroadcast}
                       onBroadcastFail={this._broadcastDidFailToStart}
                       onBroadcastStatusChange={this._broadcastStatusDidChange}
                       onBroadcastEventReceive={this._broadcastDidReceiveEvent}
                       onBroadcastErrorReceive={this._broadcastDidReceiveError}
                       onBroadcastVideoEncoded={this._broadcastVideoFrameEncoded}
                       onBroadcastStop={this._didStopBroadcast}
        >
        </BroadcastView>
        <View style={styles.recordingTimerLabel}>
          <Text style={{color: '#fff'}}>
            {this.state.broadcasting ? this.state.recordingTime: 'READY!'}
          </Text>
        </View>
        <View style={styles.cameraControls}>
          <TouchableOpacity onPress={() => {this.setState({frontCamera: !this.state.frontCamera})}}>
            <Image source={FlipImage}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({broadcasting: !this.state.broadcasting})}}>
            <Image source={this.state.recordButtonImage} style={styles.cameraControlsButton}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({flashEnabled: !this.state.flashEnabled})}}>
            <Image source={TorchImage} style={styles.cameraControlsButton}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _didStartBroadcast = () =>{
    this.setState({
      recordButtonImage: StopImage
    });
  }

  _broadcastDidFailToStart = (error) =>{
    console.log('Failed to broadcast: ', error);
  }

  _broadcastStatusDidChange = (status) => {

  }

  _broadcastDidReceiveEvent = (event) =>{

  }

  _broadcastDidReceiveError = (error) =>{

  }

  _broadcastVideoFrameEncoded = (time) => {
    this.setState({recordingTime: this._formatCurrentTime(time.encoded)}, () => {
      console.log(this.state.recordingTime);
    });
  }

  _didStopBroadcast = () => {
    this.setState({
      recordButtonImage: RecordImage
    });
  }

  _formatCurrentTime(currentTime) {
    console.log(`time: ${currentTime}`);
    let time = Number(currentTime);
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "00:") + (m > 0?m:"00") + ":" + (s < 10 ? "0" : "") + s);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  contentArea: {
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  recordingTimerLabel: {
    position: 'absolute',
    top: 36,
    padding: 5,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  cameraControls: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 32
  },
  cameraControlsButton: {
    width: 60,
    height: 60
  }
});
