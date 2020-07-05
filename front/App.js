import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';
import { Provider } from 'react-redux';

import { store } from './redux/store/store';

import Splash from './views/Splash.view';
import Login from './views/Login.view';
import Home from './views/Home.view';
import Search from './views/Search.view';
import Scanner from './views/Scanner.view';
import Details from './views/Details.view';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='bookshelf'
            size={36}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: Search,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='book-search'
            size={36}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#C5AE92',
      inactiveTintColor: 'black',
    }
  }
);
import Register from './views/Register.view';

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash, navigationOptions: { headerShown: false } },
    Home: { screen: BottomNavigator, navigationOptions: { headerShown: false } },
    Scanner: { screen: Scanner, navigationOptions: { headerShown: false } },
    Details: { screen: Details, navigationOptions: { headerShown: false } },
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
