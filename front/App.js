import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';
import { Provider } from 'react-redux';

import { store } from './redux/store/store';

import Splash from './views/Splash.view';
import Login from './views/Login.view';
import Register from './views/Register.view';

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash, navigationOptions: { headerShown: false } },
    Login: {
      screen: Login,
      navigationOptions: { headerShown: false },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      },
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
