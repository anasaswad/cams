import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, StatusBar } from 'react-native';
import { Images } from '@theme';
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {

    }


    render() {
        return (
          <TouchableOpacity onPress={this.props.onBack} style={{ marginLeft: 15, alignSelf: 'center' }}>
            <Image source={Images.back} style={{ width: 18, height: 18 }} resizeMode='contain'/>
            </TouchableOpacity>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
