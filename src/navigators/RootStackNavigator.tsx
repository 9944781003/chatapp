import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import AuthResolveScreen from '../screens/AuthResolveScreen';
import {RootState} from '../store';
import RootStackParamList from '../types/rootstack-param-list';
import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();
export default function RootStackNavigator() {
  const auth = useSelector((state: RootState) => state.auth);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <React.Fragment></React.Fragment>;
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {auth.value._id ? (
        <RootStack.Screen name="app" component={AppStackNavigator} />
      ) : (
        <RootStack.Screen name="auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}
