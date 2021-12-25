import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../store/slices/CounterSlice';
import UserSlice, {fetchUsers} from '../store/slices/UserSlice';
import {accountIcon, rightArrowIcon, sendIcon} from '../assets';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatScreen from '../screens/ChatScreen';
import AppStackParamList from '../types/appstack-param-list';
import ChatListScreen from '../screens/ChatListScreen';
type AppStackProps = NativeStackScreenProps<AppStackParamList, 'ChatScreen'>;
type navigtion = AppStackProps['navigation'];
type route = AppStackProps['route'];

const AppStack = createNativeStackNavigator<AppStackParamList>();

export default () => {
  return (
    <AppStack.Navigator initialRouteName="ChatListScreen">
      <AppStack.Screen
        options={() => ({
          title: 'My Chats',
        })}
        name="ChatListScreen"
        component={ChatListScreen}
      />
      <AppStack.Screen
        options={prop => ({
          title: prop.route.params.firstname + ' ' + prop.route.params.lastname,
        })}
        name="ChatScreen"
        component={ChatScreen}
      />
    </AppStack.Navigator>
  );
};
