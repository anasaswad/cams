import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import BroadcastView from 'react-native-wowza-gocoder';
import Ionicons from 'react-native-vector-icons/Ionicons';


class GoLive extends Component{
  constructor(props){
    super(props);
    this.config ={
      hostAddress:'streaming.alaan.tv',
      applicationName:'livecf',
      username:'',
      password:'',
      streamName:'iOS-' + Math.round(Math.random()*1000) ,
      sdkLicenseKey:'GOSK-6745-010F-DCB5-A9A9-BBE7'
    };
    this.state={
      broadcasting: false
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onBroadcastStart(){
    console.log("Bcast start");
  }
  onBroadcastFail(){
    console.log("Bcast fail");
  }
  onBroadcastStatusChange(){
    console.log("Bcast status change");
  }
  onBroadcastEventReceive(){
    console.log("Bcast event receive");
  }
  onBroadcastErrorReceive(){
    console.log("Bcast error receive");
  }
  onBroadcastVideoEncoded(){
    console.log("Bcast encoded");
  }
  onBroadcastStop(){
    console.log("Bcast stop");
  }

  broadcastPressed(){
    this.setState( (prev)=>({
      broadcasting: !prev.broadcasting
    }));
  }


  render(){
    return (
      <View style={styles.container}>
        <BroadcastView style= {styles.videoContainer}
                     hostAddress = {this.config.hostAddress}
                     applicationName = {this.config.applicationName}
                     broadcastName={this.config.streamName}
                     broadcasting = {this.state.broadcasting}
                     username = {this.config.username}
                     password = {this.config.password}
                     sizePreset = {3}
                     port={1935}
                     muted = {false}
                     flashOn = {false}
                     frontCamera =  {true}
                     onBroadcastStart= {this.onBroadcastStart}
                     onBroadcastFail= {this.onBroadcastFail}
                     onBroadcastStatusChange= {this.onBroadcastStatusChange}
                     onBroadcastEventReceive= {this.onBroadcastEventReceive}
                     onBroadcastErrorReceive= {this.onBroadcastErrorReceive}
                     onBroadcastVideoEncoded = {this.onBroadcastVideoEncoded}
                     onBroadcastStop = {this.onBroadcastStop}
                     sdkLicenseKey={this.config.sdkLicenseKey}
        >
        </BroadcastView>
        <TouchableHighlight style={styles.GoLive} onPress={this.broadcastPressed.bind(this)}>
          <View style={{width: 100, height: 100}}>
            <View style={styles.circle} />
            <Ionicons name='ios-microphone' size={100} color={this.state.broadcasting ? '#FFFFFF': '#800080' } style={styles.icon} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  videoContainer:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'blue'
  },
  icon:{
    position:'absolute',
    textAlign:'center',
    top:0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle:{
    position:'absolute',
    top:0,
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: 'red'
  },
  GoLive:{
    position:'absolute',
    left:0,
    right:0,
    bottom:40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GoLive;
