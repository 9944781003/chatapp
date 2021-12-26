import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninSceen from '../screens/SigninSceen';
import SignupSceen from '../screens/SignupScreen';
import UserProfileSceen from '../screens/UserProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

export type AuthStackParamList = {
  SigninScreen: undefined;
  SignupScreen: undefined;
  ResetPassword: undefined;
  UserProfile: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SigninScreen" component={SigninSceen} />
      <AuthStack.Screen name="SignupScreen" component={SignupSceen} />
      <AuthStack.Screen name="UserProfile" component={UserProfileSceen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};
