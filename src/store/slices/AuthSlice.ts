import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ActivityIndicatorComponent} from 'react-native';
import {useDispatch} from 'react-redux';
import userApi from '../../api/userApi';
import AsyncStatus from '../../types/async-status';
import User from '../../types/Modals/User';
import {navigationRef} from '../../utils/navigationRef';

const asyncSignUp = createAsyncThunk('auth/signup', async (user: User) => {
  try {
    let _user: User = await userApi.post(`/`, user);
    if (_user._id) {
      return _user;
    }
  } catch (error) {}
});
const asyncSignin = createAsyncThunk(
  'auth/signin',
  async (formdata: {username: string; password: string}) => {
    try {
      let users = await userApi.get(`/`, {
        params: formdata,
      });
      return users.data[0];
    } catch (error) {
      return [];
    }
  },
);
const asyncSignout = createAsyncThunk('auth/signout', async (id: string) => {
  return id;
});
const asyncTryLocalSignin = createAsyncThunk('suth/localsignin', async () => {
  let result = await AsyncStorageLib.getItem('user');
  return result ? JSON.parse(result) : {};
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'fullfilled' as AsyncStatus,
    value: {} as User,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncSignin.fulfilled, (state, {payload}) => {
      (async () => {
        await AsyncStorageLib.setItem('user', JSON.stringify(payload));
        state.status = 'fullfilled';
        state.value = payload;
      })();
    });
    builder.addCase(asyncSignin.rejected, (state, {payload}) => {
      state.status = 'rejected';
      state.value = {};
    });
    builder.addCase(asyncSignin.pending, (state, {payload}) => {
      state.status = 'pending';
      state.value = {};
    });
    builder.addCase(asyncSignUp.fulfilled, (state, {payload}) => {
      state.status = 'fullfilled';
      state.value = payload as User;
    });
    builder.addCase(asyncSignout.fulfilled, (state, {payload}) => {
      state.status = 'fullfilled';
      state.value = {_id: ''};
    });
    builder.addCase(asyncTryLocalSignin.fulfilled, (state, action) => {
      console.log('hah');
      state.status = 'fullfilled';
      state.value = action.payload;
    });
    builder.addCase(asyncTryLocalSignin.pending, (state, action) => {
      // console.log('hah');
      // state.status = 'fullfilled';
      // state.value = action.payload;
      state.status = 'pending';
      state.value = {};
    });
    builder.addCase(asyncTryLocalSignin.rejected, (state, action) => {
      // console.log('hah');
      state.status = 'rejected';
      state.value = {};
    });
  },
});

// Action creators are generated for each case reducer function

export {asyncSignUp, asyncSignin, asyncTryLocalSignin};
export default AuthSlice;
