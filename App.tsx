import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {Children} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import chatApi from './src/api/chatApi';
import AppStackNavigator from './src/navigators/AppStackNavigator';
import AuthStackNavigator from './src/navigators/AuthStackNavigator';
import RootStackNavigator from './src/navigators/RootStackNavigator';
import store, {RootState} from './src/store';
import {asyncTryLocalSignin} from './src/store/slices/AuthSlice';
import {navigationRef} from './src/utils/navigationRef';

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(asyncTryLocalSignin());
  }, []);

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
