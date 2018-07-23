import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';


class Notificationbar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { children, hide, style } = this.props;
      if (hide) {
        return null;
      }
      return (
        <View {...this.props} style={style}>
          { children }
        </View>
      );
    }
}

Notificationbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
  hide: PropTypes.bool,
};


export default Notificationbar; //connect(mapStateToProps, mapDispatchToProps)(Navbar);
