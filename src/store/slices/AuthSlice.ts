import {StackActions} from '@react-navigation/routers';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {navigationRef} from '../../utils/navigationRef';
import {User} from './UserSlice';
type Status = 'fullfilled' | 'rejected' | 'pending';

type InitialStateProps = {
  status: 'fullfilled' | 'rejected' | 'pending';
  value: User;
};
const initialState: InitialStateProps = {
  status: 'pending',
  value: {
    _id: '61c6d8d544b4f12caca42dc7',
    firstname: 'sasi',
    lastname: 's',
    email: 'sasi@gmail.com',
    phone: '9750022911',
    username: 'sasi123',
    password: 'asdfg12',
    __v: 0,
  },
};
const AsyncSignup = createAsyncThunk(
  'auth/signup',
  async (prop: User, thunkAPI) => {
    return thunkAPI.fulfillWithValue('hello');
  },
);
const AsyncSignin = createAsyncThunk('auth/signin', async () => {});
const AsyncSignout = createAsyncThunk('auth/signout', async () => {});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(AsyncSignup.fulfilled, (state, payload) => {
      return (state = {
        status: 'fullfilled',
        value: {
          _id: '61c6d8d544b4f12caca42dc7',
          firstname: 'sasi',
          lastname: 's',
          email: 'sasi@gmail.com',
          phone: '9750022911',
          username: 'sasi123',
          password: 'asdfg12',
          __v: 0,
        },
      });
    });
    builder.addCase(AsyncSignin.pending, (state, payload) => {
      state.status = 'fullfilled';
    });
    builder.addCase(AsyncSignout.rejected, (state, payload) => {});
  },
});

export {AsyncSignup};

export default authSlice;
