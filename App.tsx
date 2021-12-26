import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import RootStackNavigator from './src/navigators/RootStackNavigator';
import store from './src/store';
import {navigationRef} from './src/utils/navigationRef';

function App() {
  return <RootStackNavigator />;
}

export default () => (
  <NavigationContainer ref={navigationRef}>
    <Provider store={store}>
      <App />
    </Provider>
  </NavigationContainer>
);

const styles = StyleSheet.create({});
