import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import SigninSceen from '../screens/SigninSceen';
import SignupForm from '../components/SignupForm';
import SignupSceen from '../screens/SignupScreen';
import AuthStackParamList from '../types/authstack-param-list';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SigninScreen" component={SigninSceen} />
      <AuthStack.Screen name="SignupScreen" component={SignupSceen} />
    </AuthStack.Navigator>
  );
};
