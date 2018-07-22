import React, {Component} from 'react';
import {TouchableOpacity, Image } from 'react-native';
import { Images } from '@theme';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
          <TouchableOpacity onPress={ ()=>{} } style={{ marginLeft: 15, alignSelf: 'center' }}>
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
export default Navbar; //connect(mapStateToProps, mapDispatchToProps)(Navbar);
