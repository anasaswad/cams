import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import store from './Store';
import CamList from './components/camList';
import GoLive from './components/GoLive';

const AppNavigator = createBottomTabNavigator(
  {
    Home: CamList,
    GoLive: GoLive,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'GoLive') {
          iconName = `ios-microphone${focused ? '' : ''}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: '#800080',
    },
  }
);

export default class Main extends React.Component {
  render() {
    return <Provider store={store}>
      <AppNavigator style={styles.container} />
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
