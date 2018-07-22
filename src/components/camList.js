import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import {Video} from 'expo';
import { Metrics, Styles } from '@theme';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import {fetchCAMS} from '../actions/camActions';


class CamList extends Component{

  componentDidMount() {
    this.props.fetchCAMS();
  }

  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <SafeAreaView>
        <Navbar/>
        <View>
          <Video
            url={'http://live.cdn.alaan.tv/live/sr_live.stream/playlist.m3u8'}
            rotateToFullScreen
            autoPlay={true}
            style={{ alignSelf: 'stretch', height: Metrics.screenWidth / 16 * 9 }}
            logo=''
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
          <FlatList
            data={this.props.cams}
            renderItem={this.renderCamera}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderProgramSeparator}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  itemView: {
    alignItems: 'flex-end'
  },
  programTitle: {
    fontSize: 18,
    marginBottom: 22,
    textAlign: 'right',
    color: 'black',
    fontFamily: 'Cairo',
    fontWeight: '500'
  },
  thumbnail: {
    width: 208,
    height: 108
  },
  episodeTitle: {
    fontSize: 13.5,
    marginTop: 10,
    textAlign: 'right',
    color: 'black',
    fontFamily: 'Cairo',
    fontWeight: '500'
  },
});


const mapStateToProps = state => ({
  cams: state.cams.cams
});
export default connect(mapStateToProps, {fetchCAMS})(CamList);
