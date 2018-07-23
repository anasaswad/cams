import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView,Image } from 'react-native';
import {Video} from 'expo';
import { Metrics, Styles } from '@theme';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import {fetchCAMS} from '../actions/camActions';
import { Images } from '@theme';
import PTRView from 'react-native-pull-to-refresh';



class CamList extends Component{

  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
    this.LoadingResolve = ()=>{};
    this.refreshInterval = undefined;
  }

  componentDidMount() {
    this.props.fetchCAMS();
    this.refreshInterval = setInterval(this.props.fetchCAMS.bind(this), 3000);
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
    }
  }

  renderCamera = ({item, index}) => {
    const program = item;
    return (
      <View style={styles.itemView}>
        <Text style={styles.camTitle}>{item.name}</Text>
        <Video
          source={{ uri: item.url }}
          posterSource = {Images.logo}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay = {false}
          style={styles.videoThum}
          useNativeControls
          usePoster
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
  }
});

CamList.propTypes = {
  fetchCAMS: PropTypes.func.isRequired,
  cams: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  cams: state.cams.cams,
  isLoading: state.cams.isLoading,
  isFetching: state.cams.fetching,
});
export default connect(mapStateToProps, {fetchCAMS})(CamList);
