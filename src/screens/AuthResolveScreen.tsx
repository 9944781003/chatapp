import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import store, {RootState} from '../store';
import {asyncTryLocalSignin} from '../store/slices/AuthSlice';

export default function AuthResolveScreen() {
  const state = useSelector((state: RootState) => state.auth);
  return (
    <React.Fragment>
      <Text>{state.value._id}</Text>
    </React.Fragment>
  );
}
