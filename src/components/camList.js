import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity,
  FlatList, SafeAreaView,Image, Dimensions
} from 'react-native';
import Video from './VideoPlayer';
import { Metrics, Styles } from '@theme';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import {fetchCAMS} from '../actions/camActions';
import Notificationbar from './Notificationbar';
import { Images } from '@theme';
import PTRView from 'react-native-pull-to-refresh';
import {API} from '../config';



class CamList extends Component{

  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
    this.LoadingResolve = ()=>{};
    this.refreshInterval = undefined;
    let dim = Dimensions.get('window');
    this.state = {
      videoSize:{
        width: dim.width,
        height: this.calcVideoHeight(dim.width)
      }
    };
    this.onResize = this.onResize.bind(this);
  }
  calcVideoHeight(width){
    return width * 9 / 16;
  }
  onResize(size){
    this.setState({videoSize:{
      width: size.window.width,
      height: this.calcVideoHeight(size.window.width)
    }});
  }

  componentDidMount() {
    this.props.fetchCAMS();
    this.refreshInterval = setInterval(this.props.fetchCAMS.bind(this), API.pullInterval);
    Dimensions.addEventListener('change', this.onResize );
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onResize );
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
    }

    this.setState((prev)=>{

    });
  }

  renderCamera = ({item, index}) => {

    return (
      <View style={styles.itemView}>
        <Text style={styles.camTitle}>{item.name}</Text>
        <Video
          url={item.url }
          style={{ alignSelf: 'stretch', width: this.state.videoSize.width, height: this.state.videoSize.height}}
          paused={ item.paused }
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
