import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import {User} from '../store/slices/UserSlice';
import UserListScreen from '../screens/UserListScreen';
type AppStackProps = NativeStackScreenProps<AppStackParamList, 'ChatScreen'>;
export type AppStackParamList = {
  UserListScreen: undefined;
  ChatScreen: User;
};
const AppStack = createNativeStackNavigator<AppStackParamList>();
export default () => {
  return (
    <AppStack.Navigator initialRouteName="UserListScreen">
      <AppStack.Screen name="UserListScreen" component={UserListScreen} />
      <AppStack.Screen
        name="ChatScreen"
        options={({route}) => ({
          title: route.params.firstname
            ?.concat(' ')
            .concat(route.params.lastname || ''),
        })}
        component={ChatScreen}
      />
    </AppStack.Navigator>
  );
};
