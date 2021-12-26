import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
export type RootStackParamList = {
  resolver: undefined;
  auth: undefined;
  app: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
export default function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="auth" component={AuthStackNavigator} />
      <RootStack.Screen name="app" component={AppStackNavigator} />
    </RootStack.Navigator>
  );
}
