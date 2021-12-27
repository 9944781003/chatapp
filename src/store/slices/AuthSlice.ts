import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import {User} from './UserSlice';
type Status = 'fullfilled' | 'rejected' | 'pending';

type InitialStateProps = {
  status: 'fullfilled' | 'rejected' | 'pending';
  value: User;
};
const initialState: InitialStateProps = {
  status: 'pending',
  value: {} as User,
};
const AsyncSignup = createAsyncThunk(
  'auth/signup',
  async (prop: Omit<User, '_id' | '__v'>, thunkAPI) => {
    return userApi.post('/', prop);
  },
);
const AsyncSignin = createAsyncThunk(
  'auth/signin',
  async (prop: Pick<User, 'username' | 'password'>) => {
    const response = await userApi.get('/', {params: prop});
    console.log(response.data);
    return response.data;
  },
);

const AsyncSignout = createAsyncThunk('auth/signout', async () => {});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(AsyncSignup.fulfilled, (state, action) => {});
    builder.addCase(AsyncSignin.fulfilled, (state, action) => {
      state.status = 'fullfilled';
      state.value = action.payload[0];
    });
    builder.addCase(AsyncSignin.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(AsyncSignout.rejected, (state, action) => {});
  },
});

export {AsyncSignup, AsyncSignin};

export default authSlice;
