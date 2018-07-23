import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import store from './Store';
import CamList from './components/camList';

export default class Main extends React.Component {
  render() {
    return <Provider store={store}>
      <View style={styles.container}>
        <CamList />
      </View>
      </Provider>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
