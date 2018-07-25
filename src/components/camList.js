import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity,
  FlatList, SafeAreaView,Image,Vibration
} from 'react-native';
import Video from 'react-native-video';
import { Metrics, Styles } from '@theme';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import {fetchCAMS} from '../actions/camActions';
import Notificationbar from './Notificationbar';
import { Images } from '@theme';
import PTRView from 'react-native-pull-to-refresh';
import {API} from '../config';

const VIBRATION_PATTERN = [1000, 2000, 3000];



class CamList extends Component{

  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
    this.LoadingResolve = ()=>{};
    this.refreshInterval = undefined;
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchCAMS();
    this.refreshInterval = setInterval(this.props.fetchCAMS.bind(this), API.pullInterval);
  }

  componentWillUnmount() {
    if( this.refreshInterval )
      clearInterval(this.refreshInterval);
  }

  refresh() {
    return new Promise((resolve) => {
      this.props.fetchCAMS();
      this.LoadingResolve = resolve;
    });
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.isFetching === false && this.props.isFetching === true ){
      this.LoadingResolve();
      this.LoadingResolve = ()=>{};
      Vibration.vibrate(VIBRATION_PATTERN, true);
    }

    this.setState((prev)=>{

    });
  }

  renderCamera = ({item, index}) => {

    return (
      <View style={styles.itemView}>
        <Text style={styles.camTitle}>{item.name}</Text>
        <Video
          source={{ uri: item.url }}
          poster = {'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode={"cover"}
          repeat={false}
          style={styles.videoThum}
          paused={item.status}
          controls={true}
        />
      </View>
    )
  }

  renderSeparator(){
      return (
        <View style={{ height: 20, width: '100%' }}/>
      )
  }


  render() {
    return(
      this.props.isLoading ?
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={Images.background}
        />
      :
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <Notificationbar hide={this.props.error ===''} style={styles.Notificationbar}>
          <Text style={{fontSize: 18, color: 'white' }}>{this.props.error}</Text>
        </Notificationbar>
        <PTRView onRefresh={this.refresh} >
          <View style={{ flex: 1, marginTop: 10}}>
            <FlatList
              data={this.props.cams}
              renderItem={this.renderCamera}
              keyExtractor={(item, index) => item.name }
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </PTRView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  itemView: {
    alignItems: 'flex-start'
  },
  camTitle: {
    fontSize: 18,
    marginBottom: 22,
    textAlign: 'left',
    color: 'black',
    fontWeight: '500'
  },
  videoThum:{
    alignSelf: 'stretch',
    height: Metrics.screenWidth / 16 * 9,
    width: Metrics.screenWidth,
  },
  Notificationbar:{
    backgroundColor: 'red',
    padding: 5,
  }
});

CamList.propTypes = {
  fetchCAMS: PropTypes.func.isRequired,
  cams: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  cams: state.cams.cams,
  isLoading: state.cams.isLoading,
  isFetching: state.cams.fetching,
  error: state.cams.error,
});
export default connect(mapStateToProps, {fetchCAMS})(CamList);
