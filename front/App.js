import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/store';

import Splash from './views/Splash.view';
import Login from './views/Login.view';

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash, navigationOptions: { headerShown: false } },
    Login: { screen: Login, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}
